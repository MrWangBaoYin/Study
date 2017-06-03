/*以为多高深,又是事件循环又是事件队列,异步啊,同步啊,注册事件啊,事件响应了......无数的专业名词,
专业的看着都迷糊的名词叫做专业名词.
明明就是一个简简单单的函数调用的封装,直到看到源码,此时我内心的波动我就不说了......直接看下面*/
function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}//就是定义了两个属性
/*直接引入就好了
var Emitter = require('events'),
    event = new Emitter();
    就好了
    */
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;//为了兼容旧版本

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};//老外都是这么...语文不好!,明明前面都定义了,难道怕闲人又给删了

  // If there is no 'error' event listener then throw.
  if (type === 'error') {//发生特殊error事件时的处理
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
/*  * 如果定义了error属性,两种情况
1:如果error是一个对象,如果应的length属性值为假,抛出错误.(事件添加函数那里有判断,添加对象必须为函数,所以一般情况下不会发生)
2:如果error属性是个数组(添加多个监听函数对应的成为函数数组),数组长度为0,抛出错误.
(题外话:我现在知道的判断属性的方法最好的是Object.prototype.toString.call(target),看返回值来确定类型,有人知道源码吗,而且返回值很奇怪)*/
      er = arguments[1];
      if (er instanceof Error) {//是错误实例就抛出,不是就创造错误实例抛出
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))//如果事件未定义,返回false,其它情况返回true用于判断
    return false;

  if (isFunction(handler)) {//日奥,就是一个函数???,就是执行event._events[事件名](arg);这个函数??(这是我第一次看的时候的感受),就是给对象添加函数,然后执行函数
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);//如果有多个监听函数,就成为一个函数数组,依次按顺序执行对应的函数
  }//一开始学的时候以为是什么队列等高深的东西

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))//不是函数就报错
    throw TypeError('listener must be a function');

  if (!this._events)//又来一次
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)//事件对象本身的newListener事件
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);//原因在once函数那里,需要给newListener监听对象传递实际的函数,而不是闭包函数

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {//这里就是只警告一次
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();//打印当时的栈状态
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;//找过资料怎么验证两个方法相同,其实看源码最能证明了

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {//明明没 fired也行啊(第一次看的时候)
      fired = true;//想到了防止有蛋疼的把监听函数引用出去,这个listener函数只有执行一次的机会
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;//起作用在addListener事件那里,需要传递给addListener监听函数确切函数参数
  this.on(type, g);//就是个闭包函数,把函数返回出去

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;//如果事件不定义,直接返回

  list = this._events[type];
  length = list.length;
  position = -1;
  //如果是函数,直接删除并出发removeListener事件
  if (list === listener ||//对应once那里
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];//函数在执行过程中删除自身,只是除去在对应属性上的引用,函数本身会执行完,如果没有其他引用就会被垃圾收集程序彻底删除,fired那里
    if (this._events.removeListener)//事件对象的removeListener事件
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {//如果是数组
    for (i = length; i-- > 0;) {//感觉好屌其实没用
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {//还是once那
        position = i;//确定对应的数组下标
        break;
      }//函数数组
    }

    if (position < 0) //如果没找到,返回
      return this;

    if (list.length === 1) {
      list.length = 0;//如果数组只有这一个事件,删除整个数组
      delete this._events[type];
    } else {
      list.splice(position, 1);//只删除哪一个函数
    }

    if (this._events.removeListener)//removeListener事件
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {//没定义删除事件时
    if (arguments.length === 0)
      this._events = {};//如果没参数,重置为空对象
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {//如果没有参数,而且定义了删除事件
    for (key in this._events) {//遍历所有事件属性
      if (key === 'removeListener') continue;//先不删除删除事件,最后再删除
      this.removeAllListeners(key);//递归不对
      //(怎么没有触发删除事件,我这里怎么是removeAllListeners,应该是removeListener才对),在下面....
    }
    this.removeAllListeners('removeListener');//(这里也该是removeListener),在后面
    this._events = {};
    return this;
  }

  listeners = this._events[type];//如果是我的话,我会把下面封装成函数,直接在上面调用了!!

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};//返回一个函数数组

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};//返回对应事件处理函数的个数

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};//OO 为了兼容吧(不知道)?

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {//区分不开数组和对象
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

var Ctor = function(x, y) {

    this.x = x;

      
    this.y = y;

};

 
var scope = { x: 'scopeX', y: 'scopeY' };

 
var Bound = Ctor.bind(scope);

 
var ins = new Bound('insX', 'insY');

 
console.log(ins.x === 'insX' && ins.y === 'insY' && scope.x === 'scopeX' && scope.y === 'scopeY', 'no presetArgs');



 
Bound = Ctor.bind(scope, 'presetX');

 
ins = new Bound('insY', 'insOther');

 
console.log(ins.x === 'presetX' && ins.y === 'insY' && scope.x === 'scopeX' && scope.y === 'scopeY', 'with presetArgs');

function a() {};
console.log(Object.getOwnPropertyDescriptor(a, 'length'));

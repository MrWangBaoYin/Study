var result = [];
var type = Function.prototype.call.bind(Object.prototype.toString);

function getDependencies(tree, result) {
    var result = result || [];
    var dependencies = tree && tree.dependencies || {};
    Object.keys(dependencies).forEach(key => {
        var target = key + '@' + dependencies[key].version;
        if (result.indexOf(target) === -1) {
            result.push(target);
        }
        getDependencies(tree.dependencies[key], result);
    });

    return result.sort();
}
module.exports = getDependencies;
//完全就是照抄的,老是忘记数组的indexOf方法,对象和数组的联系纽带Object.keys

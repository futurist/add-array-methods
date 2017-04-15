function addArrayMethods (customMethods) {
  var method
  var allMethods = {}
  var nativeMethods = [
    'filter', 'slice', 'concat',
    'reverse', 'sort', 'splice',
    'map', 'fill', 'copyWithin'
  ]
  for (var i = 0; i < nativeMethods.length; i++) {
    method = nativeMethods[i]
    if (!(method in Array.prototype)) continue
    allMethods[method] = new Function(
      'return this._addArrayMethods(Array.prototype.' + method + '.apply(this, arguments))'
    )
  }
  for (method in customMethods) {
    allMethods[method] = customMethods[method]
  }
  return function (arr) {
    arr._addArrayMethods = this._addArrayMethods
    for (method in allMethods) {
      arr[method] = allMethods[method]
    }
    return arr
  }
}

function bindArray(arr, methods){
  arr._addArrayMethods = addArrayMethods(methods)
  arr._addArrayMethods(arr)
}
module.exports = bindArray


function addArrayMethods (customMethods, options) {
  options = options || {}
  var method
  var allMethods = {}
  var nativeMethods = options.natives || addArrayMethods.natives || []
  for (var i = 0; i < nativeMethods.length; i++) {
    method = nativeMethods[i]
    if (!(method in Array.prototype)) continue
    allMethods[method] = addArrayMethods[method] || (addArrayMethods[method] = new Function(
      'return this._addArrayMethods(Array.prototype.' + method + '.apply(this, arguments))'
    ))
  }
  for (method in customMethods) {
    allMethods[method] = customMethods[method]
  }
  return function adder (arr) {
    allMethods._addArrayMethods = adder
    for (method in allMethods) {
      if (options.es3) {
        arr[method] = allMethods[method]
      } else {
        Object.defineProperty(arr, method, {
          value: allMethods[method]
        })
      }
    }
    return arr
  }
}

addArrayMethods.natives = [
  'filter', 'slice', 'concat',
  'reverse', 'sort', 'splice',
  'map', 'fill', 'copyWithin'
]

module.exports = addArrayMethods

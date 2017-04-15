# add-array-methods
Add custom array methods that can chainable, like subclass Array, but not modify Array.prototype, works in ES3+

## Install

- NPM

``` bash
npm install -S add-array-methods
```

## Usage

``` javascript
var myArr = []
addArrayMethods({
  last: function() {
    return this[this.length-1]
  },
  // ... more here
})(myArr)

myArr.sort().last()
```

The result is, the `last` methods will always available, even after all **native methods** that returns array, like below:

``` javascript
assert.equal(Array.prototype.last, undefined)
myArr.filter(v=>v > 2).sort().last()
```

## API

### addArrayMethods(yourMethods, options) -> (arr) -> arr

#### options.es3 = true|false

> default: false

When set to `true`, using direct methods assign instead of `Object.defineProperty`

#### options.natives = string[]

> default: [
>    'filter', 'slice', 'concat',
>    'reverse', 'sort', 'splice',
>    'map', 'fill', 'copyWithin'
>  ]

Native methods will copy from `Array.prototype`, to `arr`

#### yourMethods = object

> default: undefined

The object format is:

``` javascript
{
  method1: func1,
  method2: func2,
  ...
}
```

**yourMethods** can overwrite native functions with same method name



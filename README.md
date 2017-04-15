# add-array-methods
Add custom array methods that can chainable, like subclass Array, but not modify Array.prototype, works in ES3+

[![npm](https://img.shields.io/npm/v/add-array-methods.svg "Version")](https://www.npmjs.com/package/add-array-methods)
[![Build Status](https://travis-ci.org/futurist/add-array-methods.svg?branch=master)](https://travis-ci.org/futurist/add-array-methods)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


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

This default value holds in `addArrayMethods.natives`

Native methods will copy from `Array.prototype`, to `arr`, when create new array wrapper

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


### addArrayMethods.natives

This property hold the default natives array values, change it will affect all upcoming instance of **addArrayMethods**


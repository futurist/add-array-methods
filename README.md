# add-array-methods
Add custom array methods that can chainable, like subclass Array, but not modify Array.prototype

## Install

- NPM

``` bash
npm i -S add-array-methods
```

- UNPKG

``` html
https://unpkg.com/add-array-methods
```

## Usage

``` javascript
var myArr = []
addArraymethods(myArr, {
  last: function() {
    return this[this.length-1]
  },
  // ... more here
})
```

The result is, the `last` methods will always available, even after all **native methods** that returns array, like below:

``` javascript
myArr.filter(v=>v > 2).sort().last()
```


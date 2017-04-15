import addArraymethods from './'
import test from 'ava'

test('defaults methods', t => {
  console.time('cost')
  new Array(1000).join().split(',').forEach(v=>{
    var myArr = [1, 2, -3, 4, 3]
    addArraymethods({
      last: function () {
        return this[this.length - 1]
      }
      // ... more here
    })(myArr)

    t.is(Array.prototype.last, undefined)
    t.is(myArr.hasOwnProperty('last'), true)
    t.is(myArr.hasOwnProperty('filter'), true)
    t.is(myArr.filter(v => v > 2).sort().last(), 4)
  })
  console.timeEnd('cost')
})

test('delete methods in natives', t => {
  var natives = addArraymethods.natives
  var index = natives.indexOf('filter')
  natives.splice(index, 1)
  t.true(natives.indexOf('filter')<0)

  var myArr = [1, 2, -3, 4, 3]
  addArraymethods({
    last: function () {
      return this[this.length - 1]
    }
    // ... more here
  })(myArr)

  t.is(Array.prototype.last, undefined)
  t.is(myArr.hasOwnProperty('filter'), false)
  t.is(myArr.filter(v => v > 2).sort().last, undefined)

  natives.splice(index, 0, 'filter')
})

test('es3 is true', t => {
  var myArr = [1, 2, -3, 4, 3]
  addArraymethods({
    last: function () {
      return this[this.length - 1]
    }
  }, {es3: true})(myArr)

  t.is(Object.getOwnPropertyDescriptor(myArr, 'last').enumerable, true)
  t.is(Object.getOwnPropertyDescriptor(myArr, 'filter').enumerable, true)
})

test('override default natives', t => {
  var myArr = [1, 2, -3, 4, 3]
  addArraymethods({
    last: function () {
      return this[this.length - 1]
    }
  }, {natives: ['filter', 'abc']})(myArr)

  t.is(myArr.hasOwnProperty('abc'), false)
  t.is(myArr.hasOwnProperty('last'), true)
  t.is(myArr.hasOwnProperty('filter'), true)
  t.is(myArr.hasOwnProperty('sort'), false)
})


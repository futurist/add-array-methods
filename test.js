import addArraymethods from './'
import test from 'ava'

test(t => {
  var myArr = [1,2,-3,4, 3]
  addArraymethods(myArr, {
    last: function() {
      return this[this.length-1]
    },
    // ... more here
  })
  t.is(Array.prototype.last, undefined)
  t.is(myArr.filter(v=>v > 2).sort().last(), 4)
})

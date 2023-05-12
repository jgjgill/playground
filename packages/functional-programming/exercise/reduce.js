import { _each } from './each.js'

var slice = Array.prototype.slice

function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  if (arguments.length === 2) {
    memo = list[0]
    list = _rest(list)
  }

  _each(list, (val) => {
    memo = iter(memo, val)
  })

  return memo
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b)
        }
  }
}

var add = _curry((a, b) => a + b)

console.log(_reduce([1, 2, 3, 4], add, 0)) // 10
console.log(_reduce([1, 2, 3], add)) // 6

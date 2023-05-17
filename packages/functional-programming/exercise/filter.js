import { _each } from './each.js'

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

function _filter(list, predi) {
  var new_list = []

  _each(list, (val) => {
    if (predi(val)) new_list.push(val)
  })

  return new_list
}

_filter = _curryr(_filter)

console.log(
  _filter([1, 2, 3, 4], (num) => num % 2),
  _filter([1, 2, 3, 4], (num) => !(num % 2)),
)
// [ 1, 3 ] [ 2, 4 ]

function _negate(func) {
  return (val) => !func(val)
}

function _reject(data, predi) {
  return _filter(data, _negate(predi))
}

console.log(_reject([1, 2, 3, 4], (num) => num > 2))

function _identity(value) {
  return value
}

var _compact = _filter(_identity)

console.log(_compact([1, 2, 0, false, null, {}]))

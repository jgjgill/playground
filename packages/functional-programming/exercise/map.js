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

function _map(list, mapper) {
  var new_list = []

  _each(list, (val, key) => new_list.push(mapper(val, key)))

  return new_list
}

_map = _curryr(_map)

console.log(_map([1, 2, 3, 4], (num) => num * 2)) // [ 2, 4, 6, 8 ]
console.log(_map(null, (num) => num * 2)) // []
_map([1, 2, 3], console.log)

function _identity(value) {
  return value
}

var _values = _map(_identity)

console.log(_values({ id: 1, name: 'jg' }))

var _get = _curryr((obj, key) => (obj == null ? undefined : obj[key]))

function _pluck(data, key) {
  return _map(data, _get(key))
}

console.log(
  _pluck(
    [
      { id: 1, name: 'jg' },
      { id: 2, name: 'jj' },
      { id: 3, name: 'gg' },
    ],
    'name',
  ),
)

var _pairs = _map((val, key) => [key, val])

console.log(_pairs({ id: 1, name: 'jg' }))

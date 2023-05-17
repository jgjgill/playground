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

function _min(data) {
  return _reduce(data, (a, b) => (a < b ? a : b))
}

function _max(data) {
  return _reduce(data, (a, b) => (a > b ? a : b))
}

console.log(_min([1, 2, 4, 10, 5, -4, -11]))
console.log(_max([1, 2, 4, 10, 5, -4, -11]))

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

var _min_by = _curryr((data, iter) => {
  return _reduce(data, (a, b) => (iter(a) < iter(b) ? a : b))
})

var _max_by = _curryr((data, iter) => {
  return _reduce(data, (a, b) => (iter(a) > iter(b) ? a : b))
})

console.log(_min_by([1, 2, 4, 10, 5, -4, -11], Math.abs))
console.log(_max_by([1, 2, 4, 10, 5, -4, -11], Math.abs))

function _push(obj, key, val) {
  if (!(key in obj)) obj[key] = []
  obj[key].push(val)

  return obj
}

var _group_by = _curryr((data, iter) => {
  return _reduce(data, (grouped, val) => _push(grouped, iter(val), val), {})
})

console.log(
  _group_by(
    [
      { id: 1, name: 'jg' },
      { id: 2, name: 'jj' },
      { id: 3, name: 'gg' },
    ],
    (user) => user.id % 2,
  ),
)

var _inc = function (count, key) {
  count[key] ? count[key]++ : (count[key] = 1)
  return count
}

var _count_by = _curryr((data, iter) => {
  return _reduce(data, (count, val) => _inc(count, iter(val)), {})
})

console.log(
  _count_by(
    [
      { id: 1, name: 'jg' },
      { id: 2, name: 'jj' },
      { id: 3, name: 'gg' },
      { id: 4, name: 'gg' },
    ],
    (user) => user.name,
  ),
)

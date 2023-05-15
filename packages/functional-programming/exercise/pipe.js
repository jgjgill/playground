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

function _pipe() {
  var fns = arguments
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg)
      },
      arg,
    )
  }
}

var f1 = _pipe(
  function (a) {
    return a + 1
  },
  function (a) {
    return a * 2
  },
)

console.log(f1(1))

function _go(arg) {
  var fns = _rest(arguments)
  return _pipe.apply(null, fns)(arg)
}

_go(
  1,
  function (a) {
    return a + 1
  },
  function (a) {
    return a * 2
  },
  console.log,
)

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

function is_object(obj) {
  return typeof obj == 'object' && !!obj
}

function _keys(obj) {
  return is_object(obj) ? Object.keys(obj) : []
}

var _find = _curryr((list, predi) => {
  var keys = _keys(list)

  for (var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]]
    if (predi(val)) return val
  }
})

console.log(_find([1, 2, 3, 4], (val) => val === 3))

var _find_index = _curryr((list, predi) => {
  var keys = _keys(list)

  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i
  }

  return -1
})

console.log(_find_index([1, 2, 3, 4], (val) => val === 3))

function _identity(value) {
  return value
}

function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1
}

console.log(_some([10, 20, 30, 40], (val) => val > 30))
console.log(_some([1, 2, 0, 10]))

function _negate(func) {
  return (val) => !func(val)
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1
}

console.log(_every([1, 2, 5, 10, 20], (val) => val > 10))
console.log(_every([1, 2, 5, 0, 20]))

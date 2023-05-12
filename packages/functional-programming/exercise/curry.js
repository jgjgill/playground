function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b)
        }
  }
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

var add = _curry((a, b) => a + b)

console.log(add(5)(3)) // 8
console.log(add(5, 2)) // 7

var sub = _curryr((a, b) => a - b)

console.log(sub(10)(5)) // -5
console.log(sub(10, 4)) // 6

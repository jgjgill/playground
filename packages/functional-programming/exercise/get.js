const user = { id: 1, name: 'id' }

function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a)
        }
  }
}

var _get = _curryr(function _get(obj, key) {
  return obj == null ? undefined : obj[key]
})

var get_id = _get('id')

console.log(_get(user, 'name')) // id
console.log(_get('name')(user)) // id
console.log(get_id(user)) // 1
console.log(_get(null, 'name')) // undefined

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

var _length = _get('length')

function is_object(obj) {
  return typeof obj == 'object' && !!obj
}

function _keys(obj) {
  return is_object(obj) ? Object.keys(obj) : []
}

export function _each(list, iter) {
  var keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]])
  }

  return list
}

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

export function _each(list, iter) {
  var keys = _keys(list)
  for (let i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]], keys[i])
  }

  return list
}

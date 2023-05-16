function is_object(obj) {
  return typeof obj == 'object' && !!obj
}

function _keys(obj) {
  return is_object(obj) ? Object.keys(obj) : []
}

console.log(_keys([1, 2, 3, 4])) // [ '0', '1', '2', '3' ]
console.log(_keys(null)) // []

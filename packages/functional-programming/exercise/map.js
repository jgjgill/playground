import { _each } from './each.js'

function _map(list, mapper) {
  var new_list = []

  _each(list, (val) => new_list.push(mapper(val)))

  return new_list
}

console.log(_map([1, 2, 3, 4], (num) => num * 2))
// [ 2, 4, 6, 8 ]

import { _each } from './each.js'

function _filter(list, predi) {
  var new_list = []

  _each(list, (val) => {
    if (predi(val)) new_list.push(val)
  })

  return new_list
}

console.log(
  _filter([1, 2, 3, 4], (num) => num % 2),
  _filter([1, 2, 3, 4], (num) => !(num % 2)),
)
// [ 1, 3 ] [ 2, 4 ]

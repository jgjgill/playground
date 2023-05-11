export function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i])
  }

  return list
}

const infinity = (function* () {
  let i = 0
  while (true) yield i++
})()

console.log(infinity.next())

const gene = function* (max, load, block) {
  let i = 0
  let curr = load
  while (i < max) {
    if (curr--) {
      block()
      i++
    } else {
      curr = load
      console.log(i)
      yield
    }
  }
}

const nbFor = (max, load, block) => {
  const iterator = gene(max, load, block)
  const f = () => {
    iterator.next().done || timeout(f)
  }
  timeout(f, 0)
}

nbFor(100, 10, working)

const gene2 = function* (max, load, block) {
  let i = 0
  while (i < max) {
    yield new Promise((res) => {
      let curr = load
      while (curr-- && i < max) {
        block()
        i++
      }
      console.log(i)
      timeout(res, 0)
    })
  }
}

const nbFor2 = (max, load, block) => {
  const iterator = gene2(max, load, block)
  const next = ({ value, done }) => done || value.then((v) => next(iterator.next()))
  next(iterator.next())
}

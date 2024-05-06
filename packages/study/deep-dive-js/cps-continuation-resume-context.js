const gene4 = (a) => {
  let b

  return new SeqIterable(
    (cont) => {
      cont.resume(a)
    },
    (cont) => {
      b = a
      cont.resume(b)
    },
  )
}

const SeqIterable = class {
  #blocks

  constructor(...blocks) {
    this.#blocks = blocks
  }

  [Symbol.iterator]() {
    return new SeqIterator(this.#blocks.slice(0))
  }
}

const SeqIterator = class {
  static done = { done: true }
  #blocks
  #cont = new Continuation()

  constructor(blocks) {
    this.#blocks = blocks
  }

  next() {
    if (!this.#blocks.length) {
      return SeqIterator.done
    }

    const cont = this.#cont
    cont.stop()
    this.#blocks.shift()(cont)
    return cont.isStop() ? SeqIterator.done : { value: cont.value(), done: false }
  }
}
const Continuation = class {
  static #stop = Symbol()
  #value

  resume(v) {
    this.#value = v
  }

  value() {
    return this.#value
  }

  stop() {
    this.#value = Continuation.#stop
  }

  isStop() {
    return this.#value === Continuation.#stop
  }
}

const gene5 = (a) => {
  let b
  return new Sequence(
    new Continuation2(0, (cont) => {
      if (!1) cont.stop()
      cont.resume()
    }),
  ).next(
    new Continuation2(1, (cont) => {
      a++
      b = a
      cont.resume(b, 0)
    }),
  )
}

const Sequence = class {
  #table = new Map()
  #cont
  #end

  constructor(cont) {
    this.#cont = this.#end = cont
    cont.setSequence(this)
  }

  next(cont) {
    this.#end.setNext(cont)
    this.#end = cont
    cont.setSequence(this)

    return this
  }

  getCont(key) {
    if (!this.#table.has(key)) {
      throw `no key: ${key}`
    }

    return this.#table.get(key)
  }

  setCont(key, cont) {
    if (this.#table.has(key)) {
      throw `exist key: ${key}`
    }

    return this.#table.set(key, cont)
  }

  [Symbol.iterator]() {
    return new Iterator(this.#cont)
  }
}

const Continuation2 = class {
  static #stop = Symbol()
  static #pass = Symbol()

  #key
  #block
  #value
  #next
  #seq

  constructor(key, block) {
    this.#key = key
    this.#block = block
  }

  setSequence(seq) {
    this.#seq = seq
    seq.setCont(this.#key, this)
  }

  setNext(cont) {
    this.#next = cont
  }

  getNext() {
    return this.#next
  }

  suspend() {
    this.#value = Continuation2.#stop
    this.#block(this)
  }

  resume(v = Continuation2.#pass, next) {
    this.#value = v
    if (next !== undefined) {
      this.#next = this.#seq.getCont(next)
    }
  }

  isStop() {
    return this.#value === Continuation2.#stop
  }

  isPass() {
    return this.#value === Continuation2.#pass
  }
}

const Iterator = class {
  static done = { done: true }

  #target

  constructor(cont) {
    this.#target = cont
  }

  next() {
    const target = this.#target

    if (target === undefined) {
      return Iterator.done
    }

    target.suspend()

    if (target.isStop()) {
      return Iterator.done
    }

    if (target.isPass()) {
      this.#target = target.getNext()
      return this.next()
    } else {
      const result = { value: target.value(), done: false }

      this.#target = target.getNext()

      return result
    }
  }
}

let i = 10

for (let j of gene5(0)) {
  if (i--) {
    console.log(j)
  } else {
    break
  }
}

const gene6 = (a) => {
  return new Context()
    .set('a', a)
    .set('b', undefined)
    .next(
      new Continuation3(0, (cont) => {
        if (!1) cont.stop()
        cont.resume()
      }),
    )
    .next(
      new Continuation3(1, (cont) => {
        cont.set('a', cont.get('a') + 1)
        cont.set('b', cont.get('a'))
        cont.resume(cont.get('b'), 0)
      }),
    )
}

const Context = class extends Map {
  #table = new Map()
  #start
  #end

  next(cont) {
    if (this.#start === undefined) {
      this.#start = this.#end = cont
    } else {
      this.#end = this.#end.next = cont
    }

    cont.context = this

    return this
  }

  getCont(key) {
    return this.#table.get(key)
  }

  setCont(key) {
    return this.#table.set(key, cont)
  }

  [Symbol.iterator]() {
    return new Iterator2(this.#start)
  }
}

const Continuation3 = class {
  static #stop = Symbol()
  static #pass = Symbol()

  #key
  #block
  #value
  #next
  #context

  constructor(key, block) {
    this.#key = key
    this.#block = block
  }

  get(key) {
    return this.#context.get(key)
  }

  set(key, value) {
    return this.#context.set(key, value)
  }

  set next(cont) {
    this.#next = cont
  }

  get next() {
    return this.#next
  }

  get value() {
    return this.#value
  }

  get isStop() {
    return this.#value === Continuation3.#stop
  }

  get isPass() {
    return this.#value === Continuation3.#pass
  }

  suspend() {
    this.#value = Continuation3.#stop
    this.#block(this)
  }

  resume(v = Continuation3.#pass, next) {
    this.#value = v
    if (next !== undefined) {
      this.#next = this.#context.getCont(next)
    }
  }
}

const Iterator2 = class {
  static done = { done: true }

  #target

  constructor(cont) {
    this.#target = cont
  }

  next() {
    const target = this.#target

    if (target === undefined) {
      return Iterator.done
    }

    target.suspend()

    if (target.isStop) {
      return Iterator.done
    }

    if (target.isPass) {
      this.#target = target.next
      return this.next()
    } else {
      const result = { value: target.value, done: false }

      this.#target = target.next

      return result
    }
  }
}

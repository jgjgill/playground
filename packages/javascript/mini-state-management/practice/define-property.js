const state = { a: 10, b: 20 }
const stateKeys = Object.keys(state)
const observer = () => console.log(`a + b = ${state.a + state.b}`)

for (const key of stateKeys) {
  let _value = state[key]
  Object.defineProperty(state, key, {
    get() {
      console.log(`현재 state.${key}의 값은 ${_value} 입니다.`)
      return _value
    },
    set(value) {
      _value = value
      observer()
    },
  })
}

state.a = 20

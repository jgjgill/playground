window.addEventListener('DOMContentLoaded', ignite)

function ignite() {
  const counterElement = document.querySelector('#counter')
  const incrementElement = document.querySelector('#increment')
  const decrementElement = document.querySelector('#decrement')
  const resetElement = document.querySelector('#reset')

  function createStore(initialState, reducer) {
    const state = new Proxy(
      { value: initialState },
      {
        set(obj, prop, value) {
          obj[prop] = value
          updateUI()
        },
      },
    )

    function getState() {
      // 'initialState'가 객체인 경우에만 동작
      return { ...state.value }
    }

    function dispatch(action) {
      const prevState = getState()
      state.value = reducer(prevState, action)
    }

    return { getState, dispatch }
  }

  const initialState = { counter: 0 }

  function reducer(state, action) {
    switch (action) {
      case 'INCREMENT':
        state.counter = state.counter + 1
        break
      case 'DECREMENT':
        state.counter = state.counter - 1
        break
      case 'RESET':
        state.counter = 0
        break
    }

    return state
  }

  const store = createStore(initialState, reducer)

  function updateUI() {
    counterElement.innerHTML = store.getState().counter
  }

  incrementElement.addEventListener('click', () => {
    store.dispatch('INCREMENT')
  })
  decrementElement.addEventListener('click', () => {
    store.dispatch('DECREMENT')
  })
  resetElement.addEventListener('click', () => {
    store.dispatch('RESET')
  })
}

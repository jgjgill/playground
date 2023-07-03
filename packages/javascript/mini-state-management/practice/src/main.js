import { observable, observe } from './observer.js'

const state = observable({ a: 10, b: 20 })

const appElement = document.querySelector('#app')

const render = () => {
  appElement.innerHTML = `
    <p>a + b = ${state.a + state.b}</p>
    <input id="stateA" value="${state.a}" />
    <input id="stateB" value="${state.b}" />
  `

  appElement.querySelector('#stateA').addEventListener('change', (e) => {
    state.a = Number(e.target.value)
  })

  appElement.querySelector('#stateB').addEventListener('change', (e) => {
    state.b = Number(e.target.value)
  })
}

observe(render)

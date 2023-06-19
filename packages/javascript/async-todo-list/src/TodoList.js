export default function TodoList({ targetElement, initialState, onClick }) {
  const divElement = document.createElement('div')
  targetElement.appendChild(divElement)

  this.state = initialState
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    divElement.innerHTML = `
      <h1>Simple TodoList</h1>
      <ul>
        ${this.state.map(({ id, title }) => `<li data-id='${id}'>${title}</li>`).join('')}
      </ul>
    `

    divElement.querySelectorAll('li').forEach((liElement) => {
      liElement.addEventListener('click', (e) => {
        onClick(Number(e.target.dataset.id))
      })
    })
  }
}

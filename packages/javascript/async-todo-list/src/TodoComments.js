export default function TodoComments({ targetElement, initialState }) {
  const divElement = document.createElement('div')
  targetElement.appendChild(divElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { selectedTodo, comments } = this.state

    divElement.innerHTML = `
      <h2>${selectedTodo?.title ?? ''}의 댓글들</h2>
      <ul>
        ${comments
          .map(
            ({ name }) => `
          <li>${name}</li>
        `,
          )
          .join('')}
      </ul>
    `
  }
}

export default function TodoList({ parentElement, initialState, onToggle, onDelete }) {
  const todoElement = document.createElement('div')
  parentElement.appendChild(todoElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { isLoading, todos } = this.state

    if (!isLoading && todos.length === 0) {
      todoElement.innerHTML = `Todo가 없습니다!`
      return
    }

    todoElement.innerHTML = `
      <ul>
        ${todos
          .map(
            ({ _id, content, isCompleted }) => `
        <li data-id="${_id}" class="todo-item">
        ${isCompleted ? `<s>${content}</s>` : content}
        <button class="remove">X</button>
        </li>
      `,
          )
          .join('')}
      </ul>
    `
  }

  todoElement.addEventListener('click', (e) => {
    const liElement = e.target.closest('.todo-item')

    if (liElement) {
      const { id } = liElement.dataset
      const { className } = e.target

      if (className === 'remove') {
        onDelete(id)
      } else {
        onToggle(id)
      }
    }
  })

  this.render()
}

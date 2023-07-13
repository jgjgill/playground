export default function TodoList({ targetElement, initialState, onDrop, onRemove }) {
  const todoListElemenet = document.createElement('div')
  todoListElemenet.setAttribute('droppable', true)

  targetElement.append(todoListElemenet)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  todoListElemenet.addEventListener('dragstart', (e) => {
    const liElement = e.target.closest('li')

    e.dataTransfer.setData('todoId', liElement.dataset.id)
  })

  todoListElemenet.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  })

  todoListElemenet.addEventListener('drop', (e) => {
    e.preventDefault()
    const { todos } = this.state
    const droppedTodoId = e.dataTransfer.getData('todoId')

    if (!todos.find((todo) => todo._id === droppedTodoId)) {
      onDrop(droppedTodoId)
    }
  })

  todoListElemenet.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const liElement = e.target.closest('li')
      if (liElement) {
        onRemove(liElement.dataset.id)
      }
    }
  })

  this.render = () => {
    const { title, todos } = this.state

    todoListElemenet.innerHTML = `
      <h2>${title}</h2>
      <ul>
        ${todos
          .map(
            (todo) =>
              `<li data-id="${todo._id}" draggable=true>${todo.content}<button>X</button></li>`,
          )
          .join('')}
      </ul>
      ${todos.length === 0 ? '설정된 일이 없습니다.' : ''}
    `
  }
}

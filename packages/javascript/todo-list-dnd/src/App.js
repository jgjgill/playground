import SyncTaskManager from './SyncTaskManager.js'
import TodoList from './TodoList.js'
import { request } from './api.js'

export default function App({ targetElement }) {
  const tasks = new SyncTaskManager()

  this.state = { todos: [] }

  const handleTodoDrop = (todoId, updateValue) => {
    const nextTodos = [...this.state.todos]
    const todoIndex = nextTodos.findIndex((todo) => todo._id === todoId)
    nextTodos[todoIndex].isCompleted = updateValue

    this.setState({ ...this.state, todos: nextTodos })

    tasks.addTask({ url: `/${todoId}/toggle`, method: 'PUT' })
  }

  const handleTodoRemove = (todoId) => {
    const nextTodos = [...this.state.todos]

    const todoIndex = nextTodos.findIndex((todo) => todo._id === todoId)
    nextTodos.splice(todoIndex, 1)

    this.setState({ ...this.state, todos: nextTodos })

    tasks.removeTasks(`/${todoId}`)
    tasks.addTask({ url: `/${todoId}`, method: 'DELETE' })
  }

  const incompletedTodoList = new TodoList({
    targetElement,
    initialState: { title: '완료되지 않은 일들', todos: [] },
    onDrop: (todoId) => {
      handleTodoDrop(todoId, false)
    },
    onRemove: handleTodoRemove,
  })

  const completedTodoList = new TodoList({
    targetElement,
    initialState: { title: '완료된 일들', todos: [] },
    onDrop: (todoId) => {
      handleTodoDrop(todoId, true)
    },
    onRemove: handleTodoRemove,
  })

  this.setState = (nextState) => {
    this.state = nextState
    const { todos } = this.state

    incompletedTodoList.setState({
      ...incompletedTodoList.state,
      todos: todos.filter((todo) => !todo.isCompleted),
    })

    completedTodoList.setState({
      ...completedTodoList.state,
      todos: todos.filter((todo) => todo.isCompleted),
    })
  }

  const fetchTodos = async () => {
    const todos = await request('')

    this.setState({ ...this.state, todos })
  }

  const buttonElement = document.createElement('button')

  buttonElement.textContent = '변경 내용 동기화'

  targetElement.append(buttonElement)

  buttonElement.addEventListener('click', () => {
    tasks.run()
  })

  fetchTodos()

  incompletedTodoList.render()
  completedTodoList.render()
}

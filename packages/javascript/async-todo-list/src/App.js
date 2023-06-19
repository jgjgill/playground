import TodoComments from './TodoComments.js'
import TodoList from './TodoList.js'
import { request } from './api.js'

export default function App({ appElement }) {
  this.state = {
    todos: [],
    selectedTodo: null,
    comments: [],
  }

  this.setState = (nextState) => {
    this.state = nextState
    todoList.setState(this.state.todos)
    todoComments.setState({
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    })
  }

  this.init = async () => {
    const data = await request('https://jsonplaceholder.typicode.com/posts')
    this.setState({
      ...this.state,
      todos: data,
    })
  }

  const todoList = new TodoList({
    targetElement: appElement,
    initialState: this.state.todos,
    onClick: async (id) => {
      const data = await request(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      )

      this.setState({
        ...this.state,
        selectedTodo: this.state.todos.find((todo) => todo.id === id),
        comments: data,
      })
    },
  })

  const todoComments = new TodoComments({
    targetElement: appElement,
    initialState: {
      selectedTodo: this.state.selectedTodo,
      comments: this.state.comments,
    },
  })

  this.init()

  todoList.render()
  todoComments.render()
}

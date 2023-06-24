import Header from './Header.js'
import TodoForm from './TodoForm.js'
import TodoList from './TodoList.js'
import UserList from './UserList.js'
import { request } from './api.js'
import { parse } from './querystring.js'

export default function App({ AppElement }) {
  const userListContainerElement = document.createElement('div')
  const todoListContainerElement = document.createElement('div')
  AppElement.append(userListContainerElement, todoListContainerElement)

  this.state = {
    userList: [],
    selectedUsername: null,
    todos: [],
    isTodoLoading: false,
  }

  const userList = new UserList({
    parentElement: userListContainerElement,
    initialState: this.state.userList,
    onSelect: async (username) => {
      history.pushState(null, null, `/?selectedUsername=${username}`)
      this.setState({
        ...this.state,
        selectedUsername: username,
      })
      await fetchTodos()
    },
  })

  const header = new Header({
    parentElement: todoListContainerElement,
    initialState: {
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    },
  })

  new TodoForm({
    parentElement: todoListContainerElement,
    onSubmit: async (content) => {
      const isFirstTodoAdd = this.state.todos.length === 0

      const todo = { content, isCompleted: false }

      this.setState({
        ...this.state,
        todos: [...this.state.todos, todo],
      })

      await request(`/${this.state.selectedUsername}`, {
        method: 'POST',
        body: JSON.stringify(todo),
      })
      await fetchTodos()

      if (isFirstTodoAdd) {
        await fetchUserList()
      }
    },
  })

  this.setState = (nextState) => {
    this.state = nextState

    header.setState({
      isLoading: this.state.isTodoLoading,
      selectedUsername: this.state.selectedUsername,
    })

    todoList.setState({
      todos: this.state.todos,
      isLoading: this.state.isTodoLoading,
    })

    userList.setState(this.state.userList)

    this.render()
  }

  this.render = () => {
    const { selectedUsername } = this.state
    todoListContainerElement.style.display = selectedUsername ? 'block' : 'none'
  }

  const todoList = new TodoList({
    parentElement: todoListContainerElement,
    initialState: {
      todos: this.state.todos,
      isLoading: this.state.isTodoLoading,
    },
    onDelete: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo.id === id)
      const nextTodos = [...this.state.todos]
      nextTodos.splice(todoIndex, 1)

      this.setState({
        ...this.state,
        todos: nextTodos,
      })

      await request(`/${this.state.selectedUsername}/${id}`, {
        method: 'DELETE',
      })
      await fetchTodos()
    },
    onToggle: async (id) => {
      const todoIndex = this.state.todos.findIndex((todo) => todo._id === id)

      const nextTodos = [...this.state.todos]
      nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted

      this.setState({
        ...this.state,
        todos: nextTodos,
      })

      await request(`/${this.state.selectedUsername}/${id}/toggle`, { method: 'PUT' })
      await fetchTodos()
    },
  })

  const fetchUserList = async () => {
    const userList = await request(`/users`)
    this.setState({
      ...this.state,
      userList,
    })
  }

  const fetchTodos = async () => {
    const { selectedUsername } = this.state

    if (selectedUsername) {
      this.setState({
        ...this.state,
        isTodoLoading: true,
      })

      const todos = await request(`/${selectedUsername}`)

      this.setState({
        ...this.state,
        todos,
        isTodoLoading: false,
      })
    }
  }

  const init = async () => {
    await fetchUserList()

    const { search } = location

    if (search.length > 0) {
      const { selectedUsername } = parse(decodeURIComponent(search).substring(1))

      if (selectedUsername) {
        this.setState({
          ...this.state,
          selectedUsername,
        })

        await fetchTodos()
      }
    }
  }

  window.addEventListener('popstate', () => {
    init()
  })
  this.render()
  init()
}

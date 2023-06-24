export default function UserList({ parentElement, initialState, onSelect }) {
  const userListElement = document.createElement('div')
  parentElement.append(userListElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    userListElement.innerHTML = `
      <h1>Users</h1>
      <ul>
        ${this.state
          .map(
            (username) => `
          <li data-username="${username}">${username}</li>
        `,
          )
          .join('')}
          <form>
            <input class="new-user" type="text" placeholder="add username" />
          </form>
      </ul>
    `
  }

  this.render()

  userListElement.addEventListener('click', (e) => {
    const userItemElement = e.target.closest('li')
    if (userItemElement) {
      const { username } = userItemElement.dataset
      onSelect(username)
    }
  })

  userListElement.addEventListener('submit', (e) => {
    const newUserInputElement = userListElement.querySelector('.new-user')
    const newUserValue = newUserInputElement.value

    if (newUserValue.length > 0) {
      onSelect(newUserInputElement.value)
      newUserInputElement.value = ''
    }
  })
}

export default function Header({ parentElement, initialState }) {
  const headerElement = document.createElement('h2')
  parentElement.appendChild(headerElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { selectedUsername, isLoading } = this.state

    if (!selectedUsername) {
      headerElement.innerHTML = ''
      return
    }

    headerElement.innerHTML = `${selectedUsername}님의 할 일 목록 ${
      isLoading ? '로딩 중...' : ''
    }`
  }

  this.render()
}

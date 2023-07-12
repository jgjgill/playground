export default function Keyword({
  targetElement,
  initialState,
  onKeywordInput,
  onEnter,
}) {
  const keywordElement = document.createElement('input')

  keywordElement.classList.add('Keyword')

  targetElement.append(keywordElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    keywordElement.value = this.state.value
  }

  keywordElement.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      onEnter()
    } else {
      onKeywordInput(e.target.value)
    }
  })
}

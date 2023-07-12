import Keyword from './Keyword.js'

export default function Header({ targetElement, initialState, onKeywordInput, onEnter }) {
  const headerElement = document.createElement('header')
  const titleElement = document.createElement('h1')

  headerElement.classList.add('Header')

  titleElement.innerHTML = `고양이 사진 검색기`

  titleElement.style.textAlign = 'center'

  this.state = initialState

  headerElement.append(titleElement)
  targetElement.append(headerElement)

  const keywordElement = new Keyword({
    targetElement: headerElement,
    initialState: { value: this.state.keyword },
    onKeywordInput,
    onEnter,
  })

  this.setState = (nextState) => {
    this.state = nextState
    keywordElement.setState({ value: this.state.keyword })
  }
}

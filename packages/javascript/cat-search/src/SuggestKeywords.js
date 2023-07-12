export default function SuggestKeywords({
  targetElement,
  initialState,
  onKeywordSelect,
}) {
  const suggestElement = document.createElement('div')
  suggestElement.classList.add('Keywords')

  targetElement.append(suggestElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState }
    this.render()
  }

  suggestElement.addEventListener('click', (e) => {
    const liElement = e.target.closest('li')

    if (liElement) {
      onKeywordSelect(liElement.textContent)
    }
  })

  window.addEventListener('keydown', (e) => {
    if (suggestElement.style.display === 'none') return
    const { key } = e

    if (key === 'ArrowUp') {
      const nextCursor = this.state.cursor - 1

      this.setState({
        ...this.state,
        cursor: nextCursor > 0 ? this.state.keywords.length - 1 : nextCursor,
      })
    } else if (key === 'ArrowDown') {
      const nextCursor = this.state.cursor + 1

      this.setState({
        ...this.state,
        cursor: nextCursor > this.state.keywords.length - 1 ? 0 : nextCursor,
      })
    } else if (key === 'Enter') {
      onKeywordSelect(this.state.keywords[this.state.cursor])
    }
  })

  this.render = () => {
    const { keywords, cursor } = this.state

    suggestElement.innerHTML = `
      <ul>
        ${keywords
          .map(
            (keyword, i) => `<li class="${cursor === i ? 'active' : ''}">${keyword}</li>`,
          )
          .join('')}
      </ul>
    `

    suggestElement.style.display = keywords.length > 0 ? 'block' : 'none'
  }
}

export default function SearchResults({ targetElement, initialState }) {
  const searchResultsElement = document.createElement('div')
  searchResultsElement.classList.add('SearchResults')

  targetElement.append(searchResultsElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    searchResultsElement.innerHTML = `
      ${this.state
        .map(
          (result) => `
        <div>
          <img src="${result.url}" />
        </div>
      `,
        )
        .join('')}
    `
  }
}

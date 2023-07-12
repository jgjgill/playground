export default function Keyword({ targetElement, onKeywordInput }) {
  const keywordElement = document.createElement('input')

  keywordElement.classList.add('Keyword')

  targetElement.append(keywordElement)

  keywordElement.addEventListener('keyup', (e) => {
    onKeywordInput(e.target.value)
  })
}

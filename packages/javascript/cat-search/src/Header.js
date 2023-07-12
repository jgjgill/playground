import Keyword from './Keyword.js'

export default function Header({ targetElement, onKeywordInput }) {
  const headerElement = document.createElement('header')
  const titleElement = document.createElement('h1')

  headerElement.classList.add('Header')

  titleElement.innerHTML = `고양이 사진 검색기`

  titleElement.style.textAlign = 'center'

  headerElement.append(titleElement)
  targetElement.append(headerElement)

  const keywordElement = new Keyword({ targetElement: headerElement, onKeywordInput })
}

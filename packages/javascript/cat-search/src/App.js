import Header from './Header.js'

export default function App({ targetElement }) {
  const header = new Header({
    targetElement,
    onKeywordInput: (keyword) => {
      if (keyword.trim().length > 1) {
        console.log(keyword)
      }
    },
  })
}

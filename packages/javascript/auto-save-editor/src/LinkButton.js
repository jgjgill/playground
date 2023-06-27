import { push } from './router.js'

export default function LinkButton({ parentElement, initialState }) {
  const linkButtonElement = document.createElement('button')
  parentElement.append(linkButtonElement)

  this.state = initialState

  linkButtonElement.addEventListener('click', () => {
    push(this.state.link)
  })

  this.render = () => {
    linkButtonElement.textContent = this.state.text
  }
}

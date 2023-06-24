import { getItem, removeItem, setItem } from './storage.js'

const TODO_TEMP_SAVE_KEY = 'TODO_TEMP_SAVE_KEY'
export default function TodoForm({ parentElement, onSubmit }) {
  const formElement = document.createElement('form')
  parentElement.appendChild(formElement)

  this.render = () => {
    formElement.innerHTML = `
      <input type="text" placeholder="할 일을 입력하세요." />
      <button type="submit">추가하기</button>
    `

    formElement.addEventListener('submit', (e) => {
      e.preventDefault()

      const inputElement = formElement.querySelector('input')
      const content = inputElement.value

      onSubmit(content)
      inputElement.value = ''
      removeItem(TODO_TEMP_SAVE_KEY)
    })
  }

  this.render()

  const inputElement = document.querySelector('input')
  inputElement.value = getItem(TODO_TEMP_SAVE_KEY, '')
  inputElement.addEventListener('keyup', (e) => {
    setItem(TODO_TEMP_SAVE_KEY, e.target.value)
  })
}

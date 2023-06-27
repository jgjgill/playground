import { push } from '../router.js'

export default function PostList({ parentElement, initialState = [] }) {
  const postListElement = document.createElement('div')
  parentElement.append(postListElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  postListElement.addEventListener('click', (e) => {
    const liElement = e.target.closest('li')

    if (liElement) {
      const { id } = liElement.dataset
      push(`/posts/${id}`)
    }
  })

  this.render = () => {
    postListElement.innerHTML = `
      <ul>
        ${this.state
          .map(
            (post) => `
          <li data-id="${post.id}">${post.title}</li>
        `,
          )
          .join('')}
      </ul>
    `
  }
}

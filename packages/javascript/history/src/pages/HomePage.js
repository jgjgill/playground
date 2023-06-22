import { request } from '../api.js'

export default function HomePage({ parentElement }) {
  const homeElement = document.createElement('div')

  this.render = () => {
    request('/products').then((products) => {
      homeElement.innerHTML = `
        <h1>Home Page</h1>
        <ul>
          ${products
            .map(
              (product) => `
            <li>
              <a class="link" href="/products/${product.id}">
                ${product.name}
              </a>
            </li>
          `,
            )
            .join('')}
        </ul>
      `
      console.log(homeElement)
      parentElement.appendChild(homeElement)
    })
  }
}

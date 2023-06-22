import ProductPage from './ProductPage.js'

const appElement = document.querySelector('#app')

new ProductPage({
  parentElement: appElement,
  initialState: {
    productId: 1,
  },
})

import ProductOptions from './ProductOptions.js'
import { request } from './api.js'

const dummyData = [
  {
    optionId: 1,
    optionName: '더미 데이터1',
    optionPrice: 10000,
    stock: 10,
  },
  {
    optionId: 2,
    optionName: '더미 데이터2',
    optionPrice: 15000,
    stock: 10,
  },
  {
    optionId: 3,
    optionName: '더미 데이터3',
    optionPrice: 10000,
    stock: 0,
  },
]

const appElement = document.querySelector('#app')

const fetchOptionData = (productId) => {
  return request(`/products/${productId}`)
    .then((product) => {
      return request(`/product-options?product.id=${product.id}`)
    })
    .then((productOptions) => {
      return Promise.all(
        productOptions
          .map((productOption) => productOption.id)
          .map((id) => {
            return request(`/product-option-stocks?productOption.id=${id}`)
          }),
      )
    })
    .then((productStocks) => {
      console.log(productStocks)
    })
}

fetchOptionData(1)

new ProductOptions({
  parentElement: appElement,
  initialState: dummyData,
  onSelect: (option) => {
    alert(option.optionName)
  },
}).render()

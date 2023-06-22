export default function Cart({ parentElement, initialState, onRemove }) {
  const cartElement = document.createElement('div')
  parentElement.appendChild(cartElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const calculateTotalPrice = () => {
    const { basePrice, selectedOptions } = this.state

    return selectedOptions.reduce(
      (acc, option) => acc + (basePrice + option.optionPrice) * option.ea,
      0,
    )
  }

  const renderOption = (option, index) => {
    const { productName, basePrice } = this.state

    return `<li data-index="${index}" class="cartItem">${productName} - ${
      option.optionName
    } | ${basePrice + option.optionPrice}, ${option.ea}개
      <button class="remove">
        x
      </button>
    </li>
    `
  }

  this.render = () => {
    const { selectedOptions } = this.state
    cartElement.innerHTML = `
      <ul>
        ${
          Array.isArray(selectedOptions) &&
          selectedOptions.map((option, index) => renderOption(option, index)).join('')
        }
      </ul>
      <div>
        ${calculateTotalPrice()}원
      </div>
    `

    cartElement.querySelectorAll('.remove').forEach((buttonElement) => {
      buttonElement.addEventListener('click', (e) => {
        const liElement = e.target.closest('.cartItem')

        if (liElement) {
          const { index } = liElement.dataset
          onRemove(Number(index))
        }
      })
    })
  }
  this.render()
}

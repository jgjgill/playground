export default function Breadcrumb({ targetElement, initialState, onClick }) {
  const breadcrumbElement = document.createElement('nav')
  breadcrumbElement.classList.add('Breadcrumb')

  targetElement.append(breadcrumbElement)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState

    this.render()
  }

  breadcrumbElement.addEventListener('click', (e) => {
    const breadcrumbItem = e.target.closest('.Breadcrumb_item')
    const { id } = breadcrumbItem.dataset

    onClick(id)
  })

  this.render = () => {
    breadcrumbElement.innerHTML = `
      <div class="Breadcrumb_item">Root</div>
      ${this.state
        .map(
          ({ name, id }) => `<div class="Breadcrumb_item" data-id="${id}">${name}</div>`,
        )
        .join('')}
    `
  }
}

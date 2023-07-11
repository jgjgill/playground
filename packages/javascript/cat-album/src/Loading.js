export default function Loading({ targetElement }) {
  const loadingElement = document.createElement('div')
  loadingElement.classList.add('loading', 'Modal')

  targetElement.append(loadingElement)

  this.state = false

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    loadingElement.style.display = this.state ? 'block' : 'none'

    loadingElement.innerHTML = `
      <div class="content">
        <img src="https://cdn.roto.codes/images/nyan-cat.gif" width="100%" alt="Loading..." />
      </div>
    `
  }
}

export default function ImageViewer({ targetElement, onClose }) {
  const imageViewerElement = document.createElement('div')
  imageViewerElement.classList.add('ImageViewer', 'Modal')

  targetElement.append(imageViewerElement)

  this.state = { selectedImageUrl: null }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  })

  imageViewerElement.addEventListener('click', (e) => {
    if (Array.from(e.target.classList).includes('Modal')) {
      onClose()
    }
  })

  this.render = () => {
    imageViewerElement.style.display = this.state.selectedImageUrl ? 'block' : 'none'

    imageViewerElement.innerHTML = `
      <div class="content">
        <img src="${this.state.selectedImageUrl}" />
      </div>
    `
  }
}

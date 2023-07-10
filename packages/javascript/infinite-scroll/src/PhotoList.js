export default function PhotoList({ targetElement, initialState, onScrollEnded }) {
  const photoList = document.createElement('div')

  targetElement.appendChild(photoList)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !this.state.isLoading &&
          this.state.photos.length < this.state.totalCount
        ) {
          observer.unobserve(entry.target)
          console.log('화면 끝!', entry.target)
          onScrollEnded()
        }
      })
    },
    { threshold: 0.5 },
  )

  let isInit = false

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  // window.addEventListener('scroll', () => {
  //   const { isLoading, totalCount, photos } = this.state

  //   const isScrollEnded =
  //     window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight

  //   if (isScrollEnded && !isLoading && photos.length < totalCount) {
  //     onScrollEnded()
  //   }
  // })

  this.render = () => {
    if (!isInit) {
      photoList.innerHTML = `
        <ul class="photoList_photos"></ul>
      `

      isInit = true
    }

    const { photos } = this.state

    const photosElement = photoList.querySelector('.photoList_photos')

    photos.forEach((photo) => {
      if (photosElement.querySelector(`[data-id="${photo.id}"]`) === null) {
        const liElement = document.createElement('li')
        liElement.setAttribute('data-id', photo.id)
        liElement.style = 'list-style: none; min-height: 800px;'
        liElement.innerHTML = `<img width="100%" src="${photo.imagePath}" />`

        photosElement.append(liElement)
      }
    })

    const lastLiElement = photosElement.querySelector('li:last-child')

    if (lastLiElement !== null) {
      observer.observe(lastLiElement)
    }
  }
}

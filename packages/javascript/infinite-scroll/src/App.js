import PhotoList from './PhotoList.js'
import { request } from './api.js'

export default function App({ targetElement }) {
  const headElement = document.createElement('h1')
  headElement.textContent = 'Cat Photos'
  headElement.style.textAlign = 'center'
  targetElement.append(headElement)

  this.state = {
    limit: 5,
    nextStart: 0,
    photos: [],
    totalCount: 0,
    isLoading: false,
  }

  const photoListComponent = new PhotoList({
    targetElement,
    initialState: {
      isLoading: this.state.isLoading,
      photos: this.state.photos,
      totalCount: this.state.totalCount,
    },
    onScrollEnded: async () => {
      await fetchPhotos()
    },
  })

  this.setState = (nextState) => {
    this.state = nextState
    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: this.state.photos,
      totalCount: this.state.totalCount,
    })
  }

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    })

    const { limit, nextStart } = this.state
    const photos = await request(`/cat-photos?_limit=${limit}&_start=${nextStart}`)

    this.setState({
      ...this.state,
      nextStart: nextStart + limit,
      photos: [...this.state.photos, ...photos],
      isLoading: false,
    })
  }

  const init = async () => {
    const totalCount = await request(`/cat-photos/count`)
    this.setState({
      ...this.state,
      totalCount,
    })
    await fetchPhotos()

    photoListComponent.render()
  }

  init()
}

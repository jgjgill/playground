import LinkButton from '../LinkButton.js'
import { fetchPosts } from '../api/post.js'
import PostList from './PostList.js'

export default function PostPage({ parentElement }) {
  const pageElement = document.createElement('div')

  new LinkButton({
    parentElement: pageElement,
    initialState: { text: 'New Post', link: '/posts/new' },
  }).render()

  const postListComponent = new PostList({ parentElement: pageElement, initialState: [] })

  this.setState = async () => {
    const posts = await fetchPosts()
    postListComponent.setState(posts)
    this.render()
  }

  this.render = () => {
    parentElement.append(pageElement)
  }
}

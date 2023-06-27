import PostPage from './pages/PostsPage.js'
import PostEditorPage from './pages/postEditor/PostEditorPage.js'
import { initRouter } from './router.js'

export default function App({ appElement }) {
  const postsPage = new PostPage({
    parentElement: appElement,
  })

  const postEditorPage = new PostEditorPage({
    parentElement: appElement,
    initialState: { postId: 'new', post: { title: '', content: '' } },
  })

  this.route = () => {
    appElement.innerHTML = ``
    const { pathname } = window.location

    if (pathname === '/') {
      postsPage.setState()
    } else if (pathname.indexOf('/posts/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditorPage.setState({ postId })
    }
  }

  window.addEventListener('popstate', () => {
    this.route()
  })

  initRouter(() => this.route())
}

import LinkButton from '../../LinkButton.js'
import { fetchEditPost } from '../../api/post.js'
import { request } from '../../api/request.js'
import { getItem, removeItem, setItem } from '../../storage.js'
import PostEditor from './PostEditor.js'

export default function PostEditorPage({ parentElement, initialState }) {
  const pageElement = document.createElement('div')

  this.state = initialState

  let postLocalSaveKey = `temp-post-${this.state.postId}`
  const post = getItem(postLocalSaveKey, { title: '', content: '' })

  let timer = null

  const postEditorComponent = new PostEditor({
    parentElement: pageElement,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer)
      }

      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, { ...post, tempSaveDate: new Date() })

        const isNew = this.state.postId === 'new'
        if (isNew) {
          const createdPost = await request('/posts', {
            method: 'POST',
            body: JSON.stringify(post),
          })
          history.replaceState(null, null, `/posts/${createdPost.id}`)
          removeItem(postLocalSaveKey)
        } else {
          await request(`/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
          })
          removeItem(postLocalSaveKey)
        }
      }, 500)
    },
  })

  new LinkButton({
    parentElement: pageElement,
    initialState: { text: '목록으로 이동', link: '/' },
  }).render()

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      if (nextState.postId !== 'new') {
        postLocalSaveKey = `temp-post-${nextState.postId}`
        const post = await fetchEditPost(nextState.postId)
        const tempPost = getItem(postLocalSaveKey, { title: '', content: '' })
        let isTempPost = false

        if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
          if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
            isTempPost = true
          }
        }

        this.state = isTempPost
          ? { ...this.state, postId: nextState.postId, post: tempPost }
          : { ...this.state, postId: nextState.postId, post }
      } else {
        this.state = nextState
      }
    } else {
      this.state = nextState
    }

    this.render()
    postEditorComponent.setState(this.state.post || { title: '', content: '' })
  }

  this.render = () => {
    parentElement.append(pageElement)
    postEditorComponent.render()
  }
}

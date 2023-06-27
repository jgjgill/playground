import { request } from './request.js'

export const fetchPosts = async () => {
  return await request('/posts')
}

export const fetchEditPost = async (postId) => {
  return await request(`/posts/${postId}`)
}

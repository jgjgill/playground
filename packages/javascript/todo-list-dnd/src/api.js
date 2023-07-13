const API_END_POINT = 'https://kdt-frontend.todo-api.programmers.co.kr/roto'

export const request = async (path, options) => {
  try {
    const res = await fetch(`${API_END_POINT}${path}`, options)

    if (!res.ok) {
      throw new Error('호출 실패')
    }

    return await res.json()
  } catch (err) {
    alert(err.message)
  }
}

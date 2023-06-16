const API_END_POINT = ''

const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)

    if (!res.ok) {
      throw new Error('서버의 상태가 이상합니다!')
    }
  } catch (err) {
    throw new Error(`무언가 잘못되었습니다! ${err.message}`)
  }
}

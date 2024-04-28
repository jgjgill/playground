import { useEffect } from 'react'

export default function Child() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.opener.postMessage(
      { type: 'child', payload: e.target.value },
      'http://localhost:5173',
    )
  }

  console.log(window.opener)

  useEffect(() => {
    const childMessage = (e: MessageEvent) => {
      if (e.data.type !== 'parent') {
        return
      }

      console.log(e.data.payload)
    }

    window.addEventListener('message', childMessage)

    return () => {
      window.removeEventListener('message', childMessage)
    }
  }, [])

  return (
    <div>
      <h1>나는 자식</h1>
      <input onChange={onChange} />
    </div>
  )
}

import { useEffect, useState } from 'react'

export default function Parent() {
  const [childData, setChildData] = useState('')

  const onClick = () => {
    window.open(
      'http://localhost:5173/child', // url
      'popup test', // target
      'popup, width=400, height=600, left=100, top=100', // windowFeatures
    )
  }

  useEffect(() => {
    const childMessage = (e: MessageEvent) => {
      if (e.data.type !== 'child' || !e.source) {
        return
      }

      setChildData(e.data.payload)

      e.source.postMessage(
        { type: 'parent', payload: e.data.payload.toLocaleUpperCase() },
        { targetOrigin: e.origin },
      )
    }

    window.addEventListener('message', childMessage)

    return () => {
      window.removeEventListener('message', childMessage)
    }
  }, [])

  return (
    <div>
      <h1>나는 부모</h1>

      <button onClick={onClick}>자식 창 열기</button>
      <div>나는 자식 데이터: {childData}</div>
    </div>
  )
}

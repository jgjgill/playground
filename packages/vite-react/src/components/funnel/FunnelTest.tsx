import { useState } from 'react'
import useFunnel from './useFunnel'

const FUNNEL_LIST = ['first', 'second', 'third'] as const

const FunnelTest = () => {
  const [registerData, setRegisterData] = useState({})
  const [Funnel, setStep] = useFunnel(FUNNEL_LIST)
  const [prev, setPrev] = useState<(typeof FUNNEL_LIST)[number][]>([])

  window.addEventListener('touchstart', (e) => {
    console.log(e.touches[0])
  })

  window.addEventListener('touchend', (e) => {
    console.log(e.changedTouches[0])
  })

  return (
    <Funnel>
      <Funnel.Step name="first">
        <div>첫 번째</div>
        <button
          onClick={() => {
            setStep('second')
            setPrev((prev) => [...prev, 'first'])
          }}
        >
          다음 페이지
        </button>
      </Funnel.Step>

      <Funnel.Step name="second">
        <div>두 번째</div>
        <button
          onClick={() => {
            setStep('third')
            setPrev((prev) => [...prev, 'second'])
          }}
        >
          다음 페이지
        </button>
      </Funnel.Step>

      <Funnel.Step name="third">
        <div>세 번째</div>
        <button>마지막 페이지!</button>
      </Funnel.Step>
    </Funnel>
  )
}

export default FunnelTest

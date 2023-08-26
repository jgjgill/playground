import { useState } from 'react'
import { First, Second, Third } from './components'

const FUNNEL_LIST = ['first', 'second', 'third'] as const

function App() {
  const [registerData, setRegisterData] = useState({})
  const [step, setStep] = useState<(typeof FUNNEL_LIST)[number]>(FUNNEL_LIST[0])

  const handleFirstNext = (data: object) => {
    setStep('second')
    setRegisterData((prev) => ({ ...prev, ...data }))
  }

  const handleSecondNext = (data: object) => {
    setStep('third')
    setRegisterData((prev) => ({ ...prev, ...data }))
  }

  const handleThirdSubmit = () => {
    console.log('데이터를 제출합니다!', registerData)
  }

  return (
    <div>
      <h1>페이지에 따른 정보</h1>

      {step === 'first' && <First onNext={(data) => handleFirstNext(data)} />}
      {step === 'second' && <Second onNext={(data) => handleSecondNext(data)} />}
      {step === 'third' && <Third onSubmit={handleThirdSubmit} />}

      <div style={{ border: '2px solid', textAlign: 'center' }}>
        가상 데이터 공간!
        <div>
          {Object.entries(registerData).map(([key, value], index) => {
            return <div key={index}>{`${key} ${value}`}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App

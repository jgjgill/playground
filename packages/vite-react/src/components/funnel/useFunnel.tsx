import { useState } from 'react'
import { Funnel, FunnelProps, StepProps, Step } from './Funnel'
import { NonEmptyArray } from './models'

const useFunnel = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
): readonly [
  ((props: Omit<FunnelProps<Steps>, 'steps' | 'step'>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element
  },
  React.Dispatch<React.SetStateAction<Steps[number]>>,
] => {
  const [step, setStep] = useState<Steps[number]>(steps[0])

  const FunnelComponent = Object.assign(
    function (props: Omit<FunnelProps<Steps>, 'steps' | 'step'>) {
      return <Funnel<Steps> steps={steps} step={step} {...props} />
    },
    { Step },
  )

  return [FunnelComponent, setStep] as const
}

export default useFunnel

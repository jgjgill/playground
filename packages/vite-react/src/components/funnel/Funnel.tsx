import { Children, ReactElement, isValidElement } from 'react'
import { NonEmptyArray } from './models'

export interface StepProps<Steps extends NonEmptyArray<string>> {
  children: React.ReactNode
  name: Steps[number]
}

export const Step = <Steps extends NonEmptyArray<string>>({
  children,
}: StepProps<Steps>) => {
  return <>{children}</>
}

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps
  step: Steps[number]
  children: Array<ReactElement<Steps>> | ReactElement<Steps>
}

export const Funnel = <Steps extends NonEmptyArray<string>>({
  steps,
  step,
  children,
}: FunnelProps<Steps>) => {
  const validChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((element) =>
      steps.includes((element.props as StepProps<Steps>).name),
    ) as Array<ReactElement<StepProps<Steps>>>

  const targetStep = validChildren.find((child) => child.props.name === step)

  return <>{targetStep}</>
}

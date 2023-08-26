import { NonEmptyArray } from './components/funnel/models'

/**
 * TODO: children 관련해서 이해 넓히기
 */

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number]
  onEnter?: () => void
  children: React.ReactNode
}

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps
  step: Steps[number]
  children:
    | Array<React.ReactElement<StepProps<Steps>>>
    | React.ReactElement<StepProps<Steps>>
}

type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<
  FunnelProps<Steps>,
  'steps' | 'step'
>

type FunnelComponent<Steps extends NonEmptyArray<string>> = ((
  props: RouteFunnelProps<Steps>,
) => JSX.Element) & {
  Step: (props: StepProps<Steps>) => JSX.Element
}

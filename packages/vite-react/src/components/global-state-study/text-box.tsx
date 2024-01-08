import { useSharedState } from './store'

export default function TextBox() {
  const [state, setState] = useSharedState()

  const setText = (text: string) => {
    setState((prev) => ({ ...prev, text: text }))
  }

  return (
    <div>
      {state.text}
      <input type="text" value={state.text} onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

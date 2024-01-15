import { useSyncExternalStore } from 'react'
import { counterStore } from './store'

export default function Counter() {
  const state = useSyncExternalStore(counterStore.subscribe, counterStore.getState)

  return (
    <div>
      <div>{state}</div>
      <button onClick={counterStore.increase}>+</button>
      <button onClick={counterStore.decrease}>-</button>
    </div>
  )
}

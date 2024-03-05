import { useCallback } from 'react'
import { createStore, useStore, useStoreSelector } from './store'

const store = createStore({ count1: 0, count2: 0 })
const selectCount2 = (state: ReturnType<typeof store.getState>) => state.count2

function Component1() {
  // const [state, setState] = useStore(store);
  const selectState = useStoreSelector(
    store,
    useCallback((state) => state.count1, []),
  )

  const inc = () => {
    // setState((prev) => ({ ...prev, count: prev.count + 1 }));
    store.setState((prev) => ({ ...prev, count1: prev.count1 + 1 }))
  }

  return (
    <div>
      {/* {state.count} */}
      {selectState}
      <button onClick={inc}>plus 1</button>
    </div>
  )
}

function Component2() {
  // const [state, setState] = useStore(store);
  const selectState = useStoreSelector(store, selectCount2)

  const inc = () => {
    // setState((prev) => ({ ...prev, count: prev.count + 2 }));
    store.setState((prev) => ({ ...prev, count2: prev.count2 + 2 }))
  }

  return (
    <div>
      {/* {state.count} */}
      {selectState}
      <button onClick={inc}>plus 2</button>
    </div>
  )
}

export default function Temp() {
  return (
    <div>
      <Component1 />
      <Component2 />
    </div>
  )
}

import { createContext, useContext, useMemo, useRef } from 'react'
import { useSubscription } from 'use-subscription'

type Store<T> = {
  getState: () => T
  setState: (action: T | ((prev: T) => T)) => void
  subscribe: (callback: () => void) => () => void
}

const createStore = <T,>(initialState: T): Store<T> => {
  let state = initialState

  const callbacks = new Set<() => void>()
  const getState = () => state
  const setState = (nextState: T | ((prev: T) => T)) => {
    state =
      typeof nextState === 'function' ? (nextState as (prev: T) => T)(state) : nextState

    callbacks.forEach((callback) => callback())
  }

  const subscribe = (callback: () => void) => {
    callbacks.add(callback)
    return () => {
      callbacks.delete(callback)
    }
  }

  return { getState, setState, subscribe }
}

type State = { count: number; text?: string }

const StoreContext = createContext<Store<State>>(
  createStore<State>({ count: 0, text: 'hello' }),
)

export const StoreProvider = ({
  initialState,
  children,
}: {
  initialState: State
  children: React.ReactNode
}) => {
  const storeRef = useRef<Store<State>>()
  if (!storeRef.current) {
    storeRef.current = createStore(initialState)
  }

  return (
    <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>
  )
}

const useSelector = <S,>(selector: (state: State) => S) => {
  const store = useContext(StoreContext)

  return useSubscription(
    useMemo(
      () => ({
        getCurrentValue: () => selector(store.getState()),
        subscribe: store.subscribe,
      }),
      [store, selector],
    ),
  )
}

const useSetState = () => {
  const store = useContext(StoreContext)

  return store.setState
}

const selectCount = (state: State) => state.count

export const Component = () => {
  const count = useSelector(selectCount)
  const setState = useSetState()
  const inc = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }))
  }

  return (
    <div>
      count: {count} <button onClick={inc}>+1</button>
    </div>
  )
}

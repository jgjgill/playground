import { useEffect, useState } from 'react'

type Store<T> = {
  getState: () => T
  setState: (action: T | ((prev: T) => T)) => void
  subscribe: (callback: () => void) => () => void
}

export const createStore = <T>(initialState: T): Store<T> => {
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

export const useStore = <T>(store: Store<T>) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState())
    })

    setState(store.getState()) // useEffect가 뒤늦게 실행돼서 store가 이미 새로운 상태를 가지고 있을 가능성 존재해서 한 번 호출
    return unsubscribe
  }, [store])

  return [state, store.setState]
}

export const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
  const [state, setState] = useState(() => selector(store.getState()))

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()))
    })

    setState(selector(store.getState()))

    return unsubscribe
  }, [store, selector])

  return state
}

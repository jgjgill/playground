import { PropsWithChildren, createContext, useContext, useState } from 'react'
// import { createContainer } from 'react-tracked'

const initialState = {
  count: 0,
  text: 'hello',
}

const useMyState = () => useState(initialState)

const MyContext = createContext<ReturnType<typeof useMyState> | null>(null)

export const useSharedState = () => {
  const value = useContext(MyContext)

  if (value === null) {
    throw new Error('Please add SharedStateProvider')
  }

  return value
}

export const SharedStateProvider = ({ children }: PropsWithChildren) => {
  return <MyContext.Provider value={useMyState()}>{children}</MyContext.Provider>
}

// export const { Provider: SharedStateProvider, useTracked: useSharedState } =
//   createContainer(useMyState)

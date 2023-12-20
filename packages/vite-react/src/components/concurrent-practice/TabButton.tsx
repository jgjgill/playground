/* eslint-disable @typescript-eslint/no-explicit-any */

export default function TabButton({ children, isActive, onClick }: any) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button
      onClick={() => {
        onClick()
      }}
    >
      {children}
    </button>
  )
}

const useFunnel = () => {
  const temp = <>테스트 컴포넌트</>

  return [temp, () => {}] as const
}

export default useFunnel

type FirstProps = {
  onNext: (data: object) => void
}

const Second = ({ onNext }: FirstProps) => {
  const handleButtonClick = () => {
    onNext({ 성별: '남' })
  }

  return (
    <div>
      성별을 수집합니다.
      <button onClick={handleButtonClick}>다음 페이지로 이동합니다!</button>
    </div>
  )
}

export default Second

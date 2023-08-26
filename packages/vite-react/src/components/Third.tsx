type FirstProps = {
  onSubmit: () => void
}

const First = ({ onSubmit }: FirstProps) => {
  const handleButtonClick = () => {
    onSubmit()
  }

  return (
    <div>
      수집한 내용을 동의합니다.
      <button onClick={handleButtonClick}>제출!</button>
    </div>
  )
}

export default First

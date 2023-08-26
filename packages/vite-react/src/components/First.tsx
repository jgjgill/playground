type FirstProps = {
  onNext: (data: object) => void
}

// function Temp() {
//   return <div>테스트 컴포넌트</div>
// }

const First = ({ onNext }: FirstProps) => {
  const handleButtonClick = () => {
    onNext({ 이름: '이종길' })
  }

  return (
    <div>
      이름을 수집합니다.
      <button onClick={handleButtonClick}>다음 페이지로 이동합니다!</button>
    </div>
  )
}

export default First

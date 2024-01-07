async function resolveOrReject() {
  await new Promise((_) => setTimeout(_, 1000))

  const randomResult = Boolean(Math.round(Math.random()))

  if (randomResult) {
    return 'pass'
  } else {
    throw Error('fail')
  }
}

async function foo() {
  try {
    return await resolveOrReject()
  } catch (err) {
    return 'caught'
  }
}

export default function AwaitPage() {
  return (
    <div>
      <h2>비동기 반환에 대해 이해하기</h2>
      <h3>return await 호출</h3>
      <button
        onClick={async () => {
          const result = await foo()
          console.log(result)
        }}
      >
        비동기 호출
      </button>
    </div>
  )
}

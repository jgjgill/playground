import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

async function getTodo(signal: AbortSignal) {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    signal,
  }).then((response) => response.json())

  return data
}

export function QueryPage() {
  const [temp, setTemp] = useState()

  // const { data: todo } = useQuery({ queryKey: ['todos', 1], queryFn: getTodo })

  // console.log(todo)

  useEffect(() => {
    const controller = new AbortController()

    getTodo(controller.signal).then((data) => {
      setTemp(data)
    })

    return () => {
      controller.abort()
    }
  }, [])

  // console.log(temp)

  return <div>Fetching Test</div>
}

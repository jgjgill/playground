// Type "Person"이 누락되었습니다. 이를 정의하고 모든 TS 오류를 수정하기 위해 persons 배열 및 logPerson 함수에 사용하세요.

interface User {
  name: string
  age: number
  occupation: string
}

interface Admin {
  name: string
  age: number
  role: string
}

export type Person = User | Admin

export const persons: Person[] /* <- Person[] */ = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
]

export function logPerson(user: Person) {
  console.log(` - ${user.name}, ${user.age}`)
}

persons.forEach(logPerson)

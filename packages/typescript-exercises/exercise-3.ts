// logPerson 함수 에러를 고치세요.
// logPerson 함수는 User와 Admin 모두를 허용해야 하며 관련 정보(User의 occupation, Admin의 role)를 출력해야 합니다.

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

export const persons: Person[] = [
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

export function logPerson(person: Person) {
  let additionalInformation: string
  if ('role' in person) {
    additionalInformation = person.role
  } else {
    additionalInformation = person.occupation
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`)
}

persons.forEach(logPerson)

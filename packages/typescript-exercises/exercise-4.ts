// 타입스크립트가 이 상황에서 타입을 이해하고 필요한 수정사항을 적용하는데 도움이 되는 방법을 알아봅니다.

interface User {
  type: 'user'
  name: string
  age: number
  occupation: string
}

interface Admin {
  type: 'admin'
  name: string
  age: number
  role: string
}

export type Person = User | Admin

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
]

export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin'
}

export function isUser(person: Person): person is User {
  return person.type === 'user'
}

export function logPerson(person: Person) {
  let additionalInformation: string = ''
  if (isAdmin(person)) {
    additionalInformation = person.role
  }
  if (isUser(person)) {
    additionalInformation = person.occupation
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`)
}

console.log('Admins:')
persons.filter(isAdmin).forEach(logPerson)

console.log()

console.log('Users:')
persons.filter(isUser).forEach(logPerson)

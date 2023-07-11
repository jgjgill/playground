// PowerUser 타입을 정의합니다. PowerUser 타입은 User와 Amdin의 모든 필드(type 제외)를 가져야 하며 코드의 모든 필드를 복제하지 않고 `powerUser` 유형도 있어야 합니다.

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

type PowerUser = Omit<User, 'type'> & Omit<Admin, 'type'> & { type: 'powerUser' }

export type Person = User | Admin | PowerUser

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
]

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin'
}

function isUser(person: Person): person is User {
  return person.type === 'user'
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser'
}

export function logPerson(person: Person) {
  let additionalInformation: string = ''
  if (isAdmin(person)) {
    additionalInformation = person.role
  }
  if (isUser(person)) {
    additionalInformation = person.occupation
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`)
}

console.log('Admins:')
persons.filter(isAdmin).forEach(logPerson)

console.log()

console.log('Users:')
persons.filter(isUser).forEach(logPerson)

console.log()

console.log('Power users:')
persons.filter(isPowerUser).forEach(logPerson)

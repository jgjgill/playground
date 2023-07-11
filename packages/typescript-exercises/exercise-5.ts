// 타입 구조를 복제하지 않고 filterUsers 함수 정의를 수정하여 입력에 따라 필요한 전체 User 정보가 아닌 필요한 기준만을 전달할 수 있습니다.
// 난이도 높은 보너스 연습: 필터 기준에서 "type"을 제외합니다.

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
  {
    type: 'admin',
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    type: 'user',
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    type: 'admin',
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
  {
    type: 'user',
    name: 'Wilson',
    age: 23,
    occupation: 'Ball',
  },
  {
    type: 'admin',
    name: 'Agent Smith',
    age: 23,
    role: 'Administrator',
  },
]

export const isAdmin = (person: Person): person is Admin => person.type === 'admin'
export const isUser = (person: Person): person is User => person.type === 'user'

export function logPerson(person: Person) {
  let additionalInformation = ''
  if (isAdmin(person)) {
    additionalInformation = person.role
  }
  if (isUser(person)) {
    additionalInformation = person.occupation
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`)
}

export function filterUsers(
  persons: Person[],
  criteria: Partial<Omit<User, 'type'>>,
): User[] {
  return persons.filter(isUser).filter((user) => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[]
    return criteriaKeys.every((fieldName) => {
      return user[fieldName] === criteria[fieldName]
    })
  })
}

console.log('Users of age 23:')

filterUsers(persons, { age: 23 }).forEach(logPerson)

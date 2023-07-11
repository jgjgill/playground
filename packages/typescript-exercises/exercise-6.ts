/**
 * 사용자를 필터링하고 personType='user'일 때 User[]를 반환하고 personType='admin'일 때 Admin[]을 반환할 수 있도록 filterPersons 입력을 수정하세요.
 * 또한 filterPersons은 personType에 따라 특정한 User/Admin 타입을 받아야 합니다.
 * `criteria` 전달인자는 `personType` 전달인자 값에 따라 동작해야 합니다.
 * `type` 필드는 `criteria` 필드에서 허용되지 않습니다.
 *
 * 난이도 높은 보너스 연습: 주어진 전달인자에 대해 더 편리한 결과를 반환하는 함수 `getObjectKeys()`를 구현하세요.
 * let criteriaKeys = Object.keys(criteria) as (keyof User)[];
 * -->
 * let criteriaKeys = getObjectKeys(criteria);
 */

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
  { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
  { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' },
]

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === 'admin' ? person.role : person.occupation
    }`,
  )
}

function getObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

export function filterPersons(
  persons: Person[],
  personType: 'user',
  criteria: Partial<Omit<User, 'type'>>,
): User[]
export function filterPersons(
  persons: Person[],
  personType: 'admin',
  criteria: Partial<Omit<Admin, 'type'>>,
): Admin[]

export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: Partial<Omit<Person, 'type'>>,
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = getObjectKeys(criteria)
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName]
      })
    })
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 })
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 })

console.log('Users of age 23:')
usersOfAge23.forEach(logPerson)

console.log()

console.log('Admins of age 23:')
adminsOfAge23.forEach(logPerson)

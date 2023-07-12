/**
 * 다음 위치에서 str-utils 모듈 구현을 확인합니다.
 * node_modules/stats/index.js
 * node_modules/stats/README.md
 *
 * 해당 모듈에 대한 타입 선언을 제공합니다.
 * declarations/stats/index.d.ts
 *
 * 타입 선언이 중복되지 않도록 타입 별칭을 사용하세요.
 */

import {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue,
} from 'stats'

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

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  { type: 'admin', name: 'Steve', age: 40, role: 'Steve' },
  { type: 'admin', name: 'Will Bruces', age: 30, role: 'Overseer' },
  { type: 'admin', name: 'Superwoman', age: 28, role: 'Customer support' },
]

const users: User[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'user', name: 'Moses', age: 70, occupation: 'Desert guide' },
  { type: 'user', name: 'Superman', age: 28, occupation: 'Ordinary person' },
  { type: 'user', name: 'Inspector Gadget', age: 31, occupation: 'Undercover' },
]

function logUser(user: User | null) {
  if (!user) {
    console.log(' - none')
    return
  }
  const pos = users.indexOf(user) + 1
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`)
}

function logAdmin(admin: Admin | null) {
  if (!admin) {
    console.log(' - none')
    return
  }
  const pos = admins.indexOf(admin) + 1
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`)
}

const compareUsers = (a: User, b: User) => a.age - b.age
const compareAdmins = (a: Admin, b: Admin) => a.age - b.age
const colorizeIndex = (value: number) => String(value + 1)

export {
  getMaxIndex,
  getMaxElement,
  getMinIndex,
  getMinElement,
  getMedianIndex,
  getMedianElement,
  getAverageValue,
}

console.log('Youngest user:')
logUser(getMinElement(users, compareUsers))
console.log(` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`)

console.log()

console.log('Median user:')
logUser(getMedianElement(users, compareUsers))
console.log(` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`)

console.log()

console.log('Oldest user:')
logUser(getMaxElement(users, compareUsers))
console.log(` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`)

console.log()

console.log('Average user age:')
console.log(` - ${String(getAverageValue(users, ({ age }: User) => age))} years`)

console.log()

console.log('Youngest admin:')
logAdmin(getMinElement(admins, compareAdmins))
console.log(` - was ${colorizeIndex(getMinIndex(users, compareUsers))}th to register`)

console.log()

console.log('Median admin:')
logAdmin(getMedianElement(admins, compareAdmins))
console.log(` - was ${colorizeIndex(getMedianIndex(users, compareUsers))}th to register`)

console.log()

console.log('Oldest admin:')
logAdmin(getMaxElement(admins, compareAdmins))
console.log(` - was ${colorizeIndex(getMaxIndex(users, compareUsers))}th to register`)

console.log()

console.log('Average admin age:')
console.log(` - ${String(getAverageValue(admins, ({ age }: Admin) => age))} years`)

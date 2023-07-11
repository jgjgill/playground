/**
 * 2 persons을 받은 후 역순으로 돌려주는 스왑을 구현합니다. 함수 자체는 이미 존재합니다. 그것에 적절한 타입을 제공하면 됩니다.
 * 또한 이 함수는 Person 타입으로만 제한되어서는 안되며 지정된 두 가지 유형에서 작동하도록 타입을 지정해야 합니다.
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

function logUser(user: User) {
  const pos = users.indexOf(user) + 1
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`)
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`)
}

const admins: Admin[] = [
  {
    type: 'admin',
    name: 'Will Bruces',
    age: 30,
    role: 'Overseer',
  },
  {
    type: 'admin',
    name: 'Steve',
    age: 40,
    role: 'Steve',
  },
]

const users: User[] = [
  {
    type: 'user',
    name: 'Moses',
    age: 70,
    occupation: 'Desert guide',
  },
  {
    type: 'user',
    name: 'Superman',
    age: 28,
    occupation: 'Ordinary person',
  },
]

export function swap<T, K>(v1: T, v2: K): [K, T] {
  return [v2, v1]
}

function test1() {
  console.log('test1:')
  const [secondUser, firstAdmin] = swap(admins[0], users[1])
  logUser(secondUser)
  logAdmin(firstAdmin)
}

function test2() {
  console.log('test2:')
  const [secondAdmin, firstUser] = swap(users[0], admins[1])
  logAdmin(secondAdmin)
  logUser(firstUser)
}

function test3() {
  console.log('test3:')
  const [secondUser, firstUser] = swap(users[0], users[1])
  logUser(secondUser)
  logUser(firstUser)
}

function test4() {
  console.log('test4:')
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0])
  logAdmin(firstAdmin)
  logAdmin(secondAdmin)
}

function test5() {
  console.log('test5:')
  const [stringValue, numericValue] = swap(123, 'Hello World')
  console.log(` - String: ${stringValue}`)
  console.log(` - Numeric: ${numericValue}`)
}

;[test1, test2, test3, test4, test5].forEach((test) => test())

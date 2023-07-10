// 데이터가 주어졌을 때 interface "User"를 정의하고 그에 따라 사용하세요.

export interface User {
  name: string
  age: number
  occupation: string
}

export const users: User[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
]

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`)
}

console.log('Users:')
users.forEach(logPerson)

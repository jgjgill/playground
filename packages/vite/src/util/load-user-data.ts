interface User {
  username: string
  name: string
  projects: string[]
  coolness?: number
  favoriteFood: string
}

async function loadUser(username: string): Promise<User | undefined> {
  const users: User[] = [
    {
      username: 'temp',
      name: 'temp-name',
      projects: ['temp-1', 'temp-2'],
      favoriteFood: 'sushi',
    },
    {
      username: 'test',
      name: 'test-name',
      projects: ['test-1', 'test-2'],
      favoriteFood: 'pizza',
    },
  ]

  return users.find((user) => user.username === username)
}

export async function loadUserData(username: string) {
  const user = await loadUser(username)

  if (!user) {
    throw new Error('no user found')
  }

  user.coolness = username === 'temp' ? 100 : -1

  return user
}

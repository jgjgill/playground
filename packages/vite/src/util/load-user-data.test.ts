import { describe, expect, it } from 'vitest'
import { loadUserData } from './load-user-data.ts'

describe('loadUserDetails', () => {
  it('loads user data as expected', async () => {
    const user = await loadUserData('temp')

    expect(user).toEqual({
      coolness: 100,
      name: 'temp-name',
      projects: ['temp-1', 'temp-2'],
      username: 'temp',
    })
  })
})

import { describe, expect, it } from 'vitest'
import { loadUserData } from './load-user-data'

describe('loadUserDetails', () => {
  it('loads user data as expected', async () => {
    const user = await loadUserData('temp')

    expect(user).toMatchInlineSnapshot(`
      {
        "coolness": 100,
        "favoriteFood": "sushi",
        "name": "temp-name",
        "projects": [
          "temp-1",
          "temp-2",
        ],
        "username": "temp",
      }
    `)
  })

  it('sets coolness level appropriately', async () => {
    // const test = await loadUserData('test')
    const temp = await loadUserData('temp')

    // expect(test.coolness).toBe(-1)
    expect(temp.coolness).toBe(100)
  })

  it('throws an error for nonexistent users', () => {
    expect(async () => await loadUserData('fakeuser')).rejects.toThrowError(
      'no user found',
    )
  })
})

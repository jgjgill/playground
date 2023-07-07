import { expect, it } from 'vitest'

it('matches snapshot', () => {
  const result = 'footbar'.toUpperCase()
  expect(result).toMatchSnapshot()
})

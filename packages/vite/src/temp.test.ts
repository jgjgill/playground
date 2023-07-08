import { expect, it } from 'vitest'

function sum(...nums: number[]) {
  return nums.reduce((acc, cur) => acc + cur, 0)
}

it('matches snapshot', () => {
  const result = 'footbar'.toUpperCase()
  expect(result).toMatchSnapshot()
})

it('1 + 1', () => {
  expect(sum(1, 1)).toEqual(2)
})

it('1 + 2 + 3', () => {
  expect(sum(1, 2, 3)).toEqual(6)
})

it('0 number', () => {
  expect(sum()).toEqual(0)
})

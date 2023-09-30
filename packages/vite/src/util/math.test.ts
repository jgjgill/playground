import { expect, it } from 'vitest'
import { add } from './math'

it('should summarize all number values in an array', () => {
  // Arrange
  const numbers = [1, 2]
  const expectedResult = numbers.reduce((acc, cur) => acc + cur, 0)

  // Act
  const results = add(numbers)

  // Assert
  expect(results).toBe(expectedResult)
})

it('should yield NaN if a least one invalid number is provided', () => {
  const inputs = ['invalid', 1]

  const result = add(inputs)

  expect(result).toBeNaN()
})

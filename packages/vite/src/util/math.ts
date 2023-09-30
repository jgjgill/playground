export function add(numbers: number[]) {
  let sum = 0

  for (const number of numbers) {
    sum += Number(number)
  }

  return sum
}

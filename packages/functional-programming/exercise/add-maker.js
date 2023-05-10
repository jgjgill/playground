function addMaker(a) {
  return function (b) {
    return a + b
  }
}

var add10 = addMaker(10)

console.log(add10(20)) // 30

var add5 = addMaker(5)
var add15 = addMaker(15)

console.log(add5(10)) // 15
console.log(add15(10)) // 25
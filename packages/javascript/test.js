console.log(1)

setTimeout(function temp() {
  console.log(2)
}, 1000)

Promise.resolve().then(function temp() {
  console.log(3)
})

Promise.resolve()
  .then(function temp() {
    console.log(4)
    setTimeout(function temp() {
      console.log(5)
    }, 0)
  })
  .then(function temp() {
    console.log(6)
  })

console.log(7)

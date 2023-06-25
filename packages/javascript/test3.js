require('./test2.js')

module.exports = new Promise(() => {
  setTimeout(async () => {
    await console.log('나는 ex3!')
  }, 1000)
})

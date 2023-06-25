require('./test3.js')

new Promise(() => {
  setTimeout(async () => {
    await console.log('나는 ex2!')
  }, 2000)
})

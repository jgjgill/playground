const express = require('express')

const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>',
  )
})

app.use('/product', (req, res, next) => {
  console.log(req.body)
  res.redirect('/')
})

app.use('/', (req, res, next) => {
  res.send('<h1>hello</h1>')
})

app.listen(3000)

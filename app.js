const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./config/mongoose')

app = express()
port = 3000

app.engine('handlebars', exphbs.engine({ default: "main" }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('running.')
})
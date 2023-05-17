const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./config/mongoose')
const Url = require('./models/url')

app = express()
port = 3000

app.engine('handlebars', exphbs.engine({ default: "main" }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log('running.')
})
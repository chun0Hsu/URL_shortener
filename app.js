const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')
const db = require('./config/mongoose')
const Url = require('./models/url')
const shortenFunc = require('./shortenFunc')

app = express()
port = 3000

app.engine('handlebars', exphbs.engine({ default: "main" }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))

//檢查網址存在
const checkUrlExists = async (req, res, next) => {
  const url = req.body.originURL;

  try {
    const response = await axios.head(url);
    if (response.status === 200) {

      next();
    } else {

      res.status(404).json({ error: 'URL does not exist' });
    }
  } catch (error) {

    res.status(500).json({ error: 'An error occurred' });
  }
};

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', checkUrlExists, (req, res) => {
  const originURL = req.body.originURL
  const shortURL = shortenFunc()

  
})

app.listen(port, () => {
  console.log('running.')
})
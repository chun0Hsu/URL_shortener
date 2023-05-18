const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')
const db = require('./config/mongoose')
const Url = require('./models/url')
const shortenFunc = require('./shortenFunc')

const app = express()
const port = 3000

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

  //先查詢網址是否存在於資料庫中(已有短網址) 也防止輸入短網址再產生一組短網址循環
  Url.findOne({ $or: [{ url: originURL }, { shortUrl: originURL.slice(-5) }] })
    .then(data => {
      if (data) {
        return data
      } else {
        return Url.create({ url: originURL, shortUrl: shortURL })
      }
    })
    .then(data => {
      res.render('index', { host: req.headers.origin, shortUrl: data.shortUrl })
    })
    .catch(error => console.log(error))
})

app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params

  Url.findOne({ shortUrl })
    .then(data => {
      if (data) {
        res.redirect(data.url)
      } else {
        res.json({ error: 'URL does not exist' })
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log('running.')
})
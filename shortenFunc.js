const shortenFunc = () => {
  const numbers = '1234567890'
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = lowerCase.toUpperCase()

  const collection = numbers + lowerCase + upperCase

  let shortUrl = ''
  for (let i = 1; i <= 5; i++) {
    shortUrl += randomElement(collection)
  }

  return shortUrl
}

const randomElement = items => {
  const randomIndex = Math.floor(Math.random() * items.length)
  return items[randomIndex]
}

module.exports = shortenFunc
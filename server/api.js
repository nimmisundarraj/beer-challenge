/**
 * API mapping
 * @author Nimmi
 */

let request = require('request')

getRandomBeer = async(req, res, next) => {  // random beers for the default section
  try {
    let query = req.query
    await request.get(`https://api.punkapi.com/v2/beers` + (query.key == 'random' ? '/random' : '?abv_lt=0.6'), (err, response, body) => {
      res.send(JSON.parse(body))
    })
  } catch (err) {
    console.log('getting error from API')
  }
}

getBeerList = async(req, res, next) => {  // beer list for the search section
  try {
    let query = req.query
    await request.get(`https://api.punkapi.com/v2/beers?${query.type}=${query.key}`, (err, response, body) => {
      res.send(JSON.parse(body))
    })
  } catch (err) {
    console.log('getting error from API')
  }
}

module.exports = {
  init: (app) => {
    app.get('/get/random', getRandomBeer)
    app.get('/get/list', getBeerList)
  }
}
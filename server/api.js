/**
 * API mapping
 * @author Nimmi
 */

let request = require('request'),
  utils = require('./utils')

let base_url = `https://api.punkapi.com`,
  endpoint = `/v2/beers`

getRandomBeer = async(req, res, next) => {  // random beers for the default section
  try {
    let query = req.query || '',
      abv = `abv_lt=0.6`

    if (!query) {  // if without query, redirected to random api
      query = {key: 'random'}
    }

    let random = query.key == `random`

    await request.get(`${base_url}${endpoint}` + (random ? `/${query.key}` : `?${abv}`), (err, response, body) => {
      let data = JSON.parse(body)
      res.send(!random ? data[(Math.random() * (data.length)) ^ 1] : data[0])
    })

  } catch (err) {
    console.log('getting error from API')
    res.status(400).send('Error in request')
  }
}

getBeerList = async(req, res, next) => {  // beer list for the search section
  try {
    let query = req.query
    let checkQuery = query && query.type && query.key  // redirected to default api, if any params is missed

    let isValidKey = utils.isValidKey(query.key) // done a validation for name, even though it is handled in the UI.
    if (!isValidKey) {
      res.status(400).send('Please enter a valid search text')
      return
    }

    await request.get(`${base_url}${endpoint}` + (checkQuery ? `?${query.type}=${query.key}` : ``), (err, response, body) => {
      let data = JSON.parse(body)
      data = data.map(e => {
        return obj = {  // returns particular set of keywords which are needed
          name: e.name,
          image_url: e.image_url,
          description: e.description
        }
      })
      res.send(data)
    })

  } catch (err) {
    console.log('getting error from API')
    res.status(400).send('Error in request')
  }
}

module.exports = {
  init: (app) => {
    app.get('/get/random', getRandomBeer)
    app.get('/get/list', getBeerList)
  }
}
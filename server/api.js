/**
 * API mapping
 * @author Nimmi
 */

let request = require('request')

getRandomBeer = async(req, res, next) => {  // random beers for the default section
  try {
    let query = req.query || ''

    if (!query) {  // if without query, redirected to random api
      query = {key: 'random'}
    }

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
    let checkQuery = query && query.type && query.key  // redirected to default api, if any params is missed

    if (query.key && !/^[a-zA-Z0-9\-\s]+$/.test(query.key)) {  // done a validation for name, even though it is handled in the UI.
      res.status(404).send('Please enter a valid search text')
      return
    }

    await request.get(`https://api.punkapi.com/v2/beers` + (checkQuery ? `?${query.type}=${query.key}` : ''), (err, response, body) => {
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
  }
}

module.exports = {
  init: (app) => {
    app.get('/get/random', getRandomBeer)
    app.get('/get/list', getBeerList)
  }
}
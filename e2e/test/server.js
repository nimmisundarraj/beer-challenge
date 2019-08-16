/**
 * Test for beer server page.
 * BeerShop
 * @author Nimmi
 */

let request = require('request')

let base_url = `http://localhost:8000/`
let deferred = protractor.promise.defer()

getResponse = (url) => {
  request(url, (err, response, body) => {
    if (response.statusCode == 200) {
      deferred.fulfill(response)
    } else {
      deferred.reject(body)
    }
  })
  return deferred.promise
}

describe('Beer shop Server side test cases - 01', () => {
  it('Check if api server is up, by returning status code as 200', cb => {
    getResponse(base_url + 'get/random?key=random').then((response) => {
      expect(response.statusCode).toBe(200)
      cb()
    })
  })

  it('Expect default beer api returns 1 data', cb => {
    getResponse(base_url + 'get/random?key=random').then((response) => {
      expect(JSON.parse(response.body).length).toBe(1)
      cb()
    })
  })

  it('Expect default beer api without a key also returns random data', cb => {
    getResponse(base_url + 'get/random').then((response) => {
      expect(JSON.parse(response.body).length).toBe(1)
      cb()
    })
  })

  it('Expect random beer api also returns random data', cb => {
    getResponse(base_url + 'get/random?key=abv_lt').then((response) => {
      expect(JSON.parse(response.body).length).toBe(1)
      cb()
    })
  })

  it('Expect search beer api by name also returns search data', cb => {
    getResponse(base_url + 'get/list?key=m&type=beer_name').then((response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0)
      cb()
    })
  })

  it('Expect search beer api by description also returns search data', cb => {
    getResponse(base_url + 'get/list?key=m&type=beer_description').then((response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0)
      cb()
    })
  })

  it('Expect search beer api without key is also handled', cb => {
    getResponse(base_url + 'get/list?type=beer_description').then((response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0)
      cb()
    })
  })

  it('Expect search beer api without type is also handled', cb => {
    getResponse(base_url + 'get/list?key=m').then((response) => {
      expect(JSON.parse(response.body).length).toBeGreaterThan(0)
      cb()
    })
  })

  it('Expect search beer api returns only selected keywords', cb => {
    request(base_url + 'get/list?key=mom&type=beer_name', (err, response, body) => {
      expect(JSON.parse(body).some(e => Object.keys(e).join() != [ 'name', 'image_url', 'description' ].join())).toBe(false)
      cb()
    })
  })

  it('Expect invalid search text are also handled in the api too', cb => {
    request(base_url + 'get/list?key=mom!@&type=beer_name', (err, response, body) => {
      expect(body).toBe('Please enter a valid search text')
      cb()
    })
  })
})
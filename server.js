/**
 * Server side
 * @author Nimmi
 */

let express = require('express'),
  url = require('url'),
  http = require('http'),
  path = require('path'),
  api = require('./server/api');

let app = module.exports = express()

app.set('port', 8000)

app.use(express.bodyParser())
app.use(express.static(__dirname))
api.init(app)

app.get(/^(.*)$/, function(req, res, next){
  res.sendfile(path.join(__dirname, '/client/app.html'))
})

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

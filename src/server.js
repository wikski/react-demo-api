const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser').json
const util = require('util')

// a better console
global.z = log => { console.log( util.inspect(log, false, 9, true) ) }

const config = require('./config')
const firestore = require('./firestore')
const routes = require('./routes')

// init express
const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser())

// routing
routes.init(app)

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`...and we\'re up on port ${config.port}`))
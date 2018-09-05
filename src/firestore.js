const firebase = require('firebase')

const config = require('./config')

const app = firebase.initializeApp(config.firebase)
const db = app.firestore()
db.settings({ timestampsInSnapshots: true })

module.exports = db
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const api = require('./route')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/word', api)

module.exports = app

const express = require('express')
const ctrl = require('./ctrl')
const api = express.Router()

api.post('/add', ctrl.add)
api.put('/update', ctrl.update)
api.get('/get', ctrl.get)
api.post('/trans', ctrl.transform)

module.exports = api

const express = require('express')
const swaggerUi = require('swagger-ui-express')
const routes = require('./routes')
const oas = require('./build-oas')

const app = express()

app.use(express.json())
app.use(routes)
app.use('/api', swaggerUi.serve, swaggerUi.setup(oas))

module.exports = app

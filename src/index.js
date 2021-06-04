const app = require('./app')

const server = app.listen(3000, () => console.log('Server running at http://localhost:3000'))

module.exports = { server }

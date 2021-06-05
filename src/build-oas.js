const { writeFileSync } = require('fs')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      description: 'This is a simple user API',
      contact: {
        email: 'time-apis@luizalabs.com'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    tags: [
      {
        name: 'user'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            name: {
              type: 'string'
            },
            email: {
              type: 'string'
            },
            phone: {
              type: 'string'
            },
            age: {
              type: 'integer'
            }
          },
          example: {
            id: 'abd3796b-7f18-4cbf-bde7-d82146e33051',
            name: 'Peter Parker',
            email: 'peter.parker@luizalabs.com',
            phone: '11999999999'
          }
        },
        Users: {
          type: 'array',
          example: [{id:'abd3796b-7f18-4cbf-bde7-d82146e33051', name:'Peter Parker', email:'peter.parker@luizalabs.com', phone:'11999999999'}],
          items: {
            $ref: '#/components/schemas/User'
          }
        }
      }
    }
  },
  apis: ['src/routes.js']
}

const oas = swaggerJsdoc(swaggerOptions)
writeFileSync('./openapi.json', JSON.stringify(oas, null, 2))

module.exports = oas

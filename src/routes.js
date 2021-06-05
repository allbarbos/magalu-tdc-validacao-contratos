const express = require('express')
const routes = express.Router()
const uuid = require('uuid')

const users = [
  {
    id: 'abd3796b-7f18-4cbf-bde7-d82146e33051',
    name: 'Peter Parker',
    email: 'peter.parker@luizalabs.com',
    phone: '11999999999',
    age: 40
  }
]

// const routes = Router()

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *     - user
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *               
 */
routes.get('/users', (_, res) => {
  return res.json(users)
})

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     tags:
 *     - user
 *     summary: Find user by ID
 *     parameters:
 *     - name: userId
 *       in: path
 *       description: ID of user to return
 *       required: true
 *       example: abd3796b-7f18-4cbf-bde7-d82146e33051
 *       schema:
 *         type: string
 *         format: uuid
 *     responses:
 *       200:
 *         description: Returned user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
routes.get('/users/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id)
  if (!user) return res.status(404).send('User not found')
  return res.json(user)
})

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *     - user
 *     summary: Add a new user
 *     requestBody:
 *       description: User that needs to be added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       required: true
 *     responses:
 *       201:
 *         description: Added user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
routes.post('/users', (req, res) => {
  const user = {
    id: 'abd3796b-7f18-4cbf-bde7-d82146e33051',
    name: 'Peter Parker',
    email: 'peter.parker@luizalabs.com',
    phone: '11999999999'
  }

  users.push(user)
  return res.status(201).json(user)
})

module.exports = routes

const gamesRouter = require('express').Router()
const Game = require('../models/games')

gamesRouter.get('/', async (request, response) => {
	// TODO: complete implementation for GET all
	response.json([])
})

gamesRouter.post('/', async (request, response) => {
  const blog = new Game(request.body)
	// TODO: implement input validation
	// TODO: BONUS create new entry with async/await syntax
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

// TODO: implement GET /:id for a specific game

// TODO: implement DELETE /:id to remove a game

module.exports = gamesRouter


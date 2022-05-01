const gamesRouter = require('express').Router()
const Game = require('../models/games')
gamesRouter.get('/', async (request, response) => {

  // TODO: complete implementation for GET all
  Game.find({}).then(games => {
    response.json(games)
  })


})

const vaildWinner = (input) => {

  if(input == "player wins" || input == "computer wins" || input == "draw") {

    return true
  }

  return false
}
const isValidMove = n => {
  // TODO: complete implementation
  // HINT: Number has methods to check if a value is an integer
  if(Number.isInteger(n) && n > -1 && n < 3) {

    return true
  }

  return false
}

const validGame = (game) => {

  if (vaildWinner(game.winner) && isValidMove(game.moves.player) ) {

    return true
  }

  return false
}

gamesRouter.post('/', async (request, response) => {

	// TODO: implement input validation
  const game = new Game({
    "winner": request.body.winner,
    "moves": request.body.moves,
    "playedAt": request.body.playedAt

  })


  if(validGame(game)) {
	// TODO: BONUS create new entry with async/await syntax
    const game = new Game({
      "winner": request.body.winner,
      "moves": request.body.moves,
      "playedAt": request.body.playedAt

    })
    await game
      .save()
      .then(result => {
        response.status(201).json(result)
    })
  } else {

    console.log("failed")
  }
})

// TODO: implement GET /:id for a specific game
gamesRouter.get('/:id', (request, response, next) => {
  Game.findById(request.params.id)
    .then(game => {
      if (game) {
        response.json(game)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// TODO: implement DELETE /:id to remove a game
gamesRouter.delete('/:id', (request, response, next) => {
  Game.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = gamesRouter

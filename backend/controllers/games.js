const mongoose = require('mongoose')
const gamesRouter = require('express').Router()
const gameHelper = require('../utils/game_helper')

const Game = require('../models/games')

gamesRouter.get('/', async (request, response) => {
  await Game.find()
    .then(games => {
      return response.status(200).json(games);
    })
    .catch(error => {
      return response.status(404).json({ message: error.message });
    });
})

gamesRouter.post('/', async (request, response) => {
  let game;
  let winner;

  try {
    game = request.body;

    if (!gameHelper.isWinnerInputValid(game.winner) ||
        !gameHelper.isValidMove(game.computer) ||
        !gameHelper.isValidMove(game.player)) {
        throw new Error("Invalid Game")
    }

    winner = gameHelper.play({ player: game.player, computer: game.computer });

    if (winner !== game.winner) {
      throw new Error("Invalid Winner");
    }

    const newGame = new Game({
      winner: game.winner,
      moves: {
        player: game.player,
        computer: game.computer
      }
    });

    await newGame.save().then(result => {
      return response.status(200).json(result);
    });
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
})

gamesRouter.get('/:id', async (request, response) => {
  let id;

  try {
    if (!(id = Number(request.params.id)) ||
      !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Game ID");
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  try {
    await Game.findById(id).then(game => {
      if (game) {
        return game;
      }

      throw new Error(`No Game Found With Given ID: ${id}`);
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
})

gamesRouter.delete('/:id', async (request, response) => {
  let id;

  try {
    if (!(id = Number(request.params.id)) ||
      !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Game ID");
    }
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }

  try {
    await Game.findOneAndDelete({ _id: id }, function (err, docs) {
      if (err) {
        throw new Error(err);
      }

      return response.status(200).json({ message: `Game ID=${id} Deleted` });
    })
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
})



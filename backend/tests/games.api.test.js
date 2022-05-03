const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Game = require('../models/games')

const games = [
	{
		"winner": "player",
		"moves": {
			"player": 0,
			"computer": 2
		}
	},
	{
		"winner": "computer",
		"moves": {
			"player": 0,
			"computer": 1
		}
	},
]

const testPlayedAtValue = new Date(+1619743623)

beforeAll(async () => {
	// clear out any existing data
	await Game.deleteMany({})
	// save initial data
	let saves = games.map(async ({ winner, moves }) => {
		return new Game({ winner, moves, playedAt: testPlayedAtValue }).save()
	})
	// block until saves are complete
	await Promise.all(saves)
})

describe('GET /api/games', () => {
	test('games are returned as json', async () => {
		await api.get('/api/games')
			.expect(200)
			.expect(response => {
				expect(response.body).toHaveLength(games.length);
			})
	})
})

describe('POST /api/games', () => {
	const newGame = {
        winner: "computer",
        player: 0,
        computer: 1
    };

	const newInvalidGame = {
        winner: "player",
        player: 0,
        computer: 1
    };

	test('create a new game, expect 200 response and valid json', async () => {
		await api.post('/api/games')
			.send(newGame)
			.expect(200)
			.expect(response => {
				const { winner, moves } = response.body

				expect({ winner, moves }).toEqual({
                    winner: newGame.winner,
                    moves: {
                        player: newGame.player,
                        computer: newGame.computer
                    }
                });
			})
	})

	test('create a new invalid game, expect 400 and invalid json', async () => {
		await api.post('/api/games')
			.send(newInvalidGame)
			.expect(400)
			.expect(response => {
				const { winner, moves } = response.body

				expect({ winner, moves }).toEqual({
                    winner: undefined,
                    moves: undefined
                });
			})
	})
})

afterAll(() => {
	mongoose.connection.close()
})

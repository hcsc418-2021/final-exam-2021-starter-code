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
		await api
			.get('/api/games')
			.expect(200)
			.expect(res => {
				// TODO: assert that API returned expected number of games
			})
	})
})


describe('POST /api/games', () => {
	test('create a new game', async () => {
		// TODO: assert that API return new game object
	})
})

afterAll(() => {
	mongoose.connection.close()
})

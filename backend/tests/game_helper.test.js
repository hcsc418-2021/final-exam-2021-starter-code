const gameHelper = require('../utils/game_helper')

describe("game helper unit tests", () => {
	test('a function named play', () => {
		expect(gameHelper.play).toBeDefined()
	})

	test('when neither ROCK, PAPER nor SCISSORS is played, expect undefined', () => {
		const result = gameHelper.play({player: 99, computer: 0})
		expect(result).toBe(undefined)
	})

	test('when player plays ROCK and computer plays ROCK, expect a draw', () => {
		const result = gameHelper.play({player: 0, computer: 0})
		expect(result).toBe('draw')
	})
	// TODO: write test to cover the other 8 cases
})

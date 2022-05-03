const gameHelper = require('../utils/game_helper')

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

describe("game helper unit tests", () => {
    test('a function named play', () => {
        expect(gameHelper.play).toBeDefined()
    })

    test('when neither ROCK, PAPER nor SCISSORS is played, expect undefined', () => {
        const result = gameHelper.play({ player: 99, computer: 0 });
        expect(result).toBe(undefined);
    })

    test('when player plays ROCK and computer plays ROCK, expect a draw', () => {
        const result = gameHelper.play({ player: ROCK, computer: ROCK });
        expect(result).toBe('draw');
    })

	test('when player plays ROCK and computer plays PAPER, expect the computer wins', () => {
        const result = gameHelper.play({ player: ROCK, computer: PAPER });
        expect(result).toBe('computer');
    })

	test('when player plays ROCK and computer plays SCISSORS, expect player wins', () => {
        const result = gameHelper.play({ player: ROCK, computer: SCISSORS });
        expect(result).toBe('player');
    })

    test('when player plays PAPER and computer plays PAPER, expect a draw', () => {
        const result = gameHelper.play({ player: PAPER, computer: PAPER });
        expect(result).toBe('draw');
    })

	test('when player plays PAPER and computer plays ROCK, expect player wins', () => {
        const result = gameHelper.play({ player: PAPER, computer: ROCK });
        expect(result).toBe('player');
    })

	test('when player plays PAPER and computer plays SCISSORS, expect the computer wins', () => {
        const result = gameHelper.play({ player: PAPER, computer: SCISSORS });
        expect(result).toBe('computer');
    })

    test('when player plays SCISSORS and computer plays SCISSORS, expect a draw', () => {
        const result = gameHelper.play({ player: SCISSORS, computer: SCISSORS });
        expect(result).toBe('draw');
    })

	test('when player plays SCISSORS and computer plays PAPER, expect player wins', () => {
        const result = gameHelper.play({ player: SCISSORS, computer: PAPER });
        expect(result).toBe('player');
    })

	test('when player plays SCISSORS and computer plays ROCK, expect the computer wins', () => {
        const result = gameHelper.play({ player: SCISSORS, computer: ROCK });
        expect(result).toBe('computer');
    })    
}) 

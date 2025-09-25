
import type { Player, Game, Cell, Result } from "../../Types/GameTypes.ts"

const empty: Cell = ""

const initialBoard = [

    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]


]







type CoordIdx = 0 | 1 | 2
type Coordinate = {
    row: CoordIdx,
    col: CoordIdx
}
type WinningCombination = [Coordinate, Coordinate, Coordinate]

const allPossibleWinCombinations: WinningCombination[] = [
    // row 0
    [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 0,
        col: 2
    }],
    // row 1
    [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }],

    // row 2

    [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }],

    // col 0

    [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 0
    }, {
        row: 2,
        col: 0
    }],

    // col 1

    [{
        row: 0,
        col: 1
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 1
    }],





    // col 2

    [{
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 2
    }, {
        row: 2,
        col: 2
    }],




    // diag 1

    [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }],



    // diag 2

    [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }],


]

function checkResult(board: Cell[][]): Result {

    let isFull: Boolean = true

    // 1. check for x or o wins:
    for (const combo of allPossibleWinCombinations) {
        const firstValue = board[combo[0].row]![combo[0].col]
        const secondValue = board[combo[1].row]![combo[1].col]
        const thirdValue = board[combo[2].row]![combo[2].col]

        if (firstValue === secondValue && secondValue === thirdValue) {
            return firstValue as Player
        }

        else if (firstValue === "" || secondValue === "" || thirdValue === "") {
            isFull = false
        }
    }

    if (isFull) { return "tie" }


    return undefined
}



export function changeGameState(state: Game, row: number, column: number): Game {

    console.log("Row:", row, "Col:", column, "Cell value:", state.board[row]?.[column])
    let boardCopy = structuredClone(state.board)
    let nextPlayer: Player = state.currentPlayer
    console.log("prevBoard", boardCopy[row]![column])
    if (boardCopy[row]![column] === "") {
        boardCopy[row]![column] = nextPlayer
        nextPlayer = state.currentPlayer == "X" ? "O" : "X"
        console.log("next player: ", nextPlayer)
    }

    const result = checkResult(boardCopy)

    const newGame: Game = {
        currentPlayer: nextPlayer,
        board: boardCopy,
        result: result,
        gameId: state.gameId
    }

    console.log("new board", newGame.board)

    return newGame
}

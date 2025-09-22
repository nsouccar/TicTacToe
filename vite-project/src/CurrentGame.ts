
 export type Player = "X" | "O"
 export type Cell = Player | ""
 export type Result = Player | "tie" | undefined

export type CurrentGame = {
    currentPlayer: Player
    board: Cell[][]
    result?: Result
}

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
        const firstValue = board[combo[0].row][combo[0].col]
        const secondValue = board[combo[1].row][combo[1].col]
        const thirdValue = board[combo[2].row][combo[2].col]

        if(firstValue === secondValue && secondValue === thirdValue){
            return firstValue as Player
        }

        else if(firstValue === "" || secondValue === "" || thirdValue === "" ) {
            isFull = false
        }
    }

    if (isFull) {return "tie"}

    
    return undefined
}



export function changeGameState(state: CurrentGame, row: number, column: number) {
    let boardCopy = Array.from(state.board)
    let nextPlayer: Player = state.currentPlayer
    if (boardCopy[row][column] === "" ){
         nextPlayer= state.currentPlayer == "X" ? "O" : "X"

        boardCopy[row][column] = nextPlayer

    } 


    const result = checkResult(boardCopy)
    console.log(result)


    const newGame: CurrentGame = {
        currentPlayer: nextPlayer,
        board: boardCopy
    }



    return newGame


}

export type Player = "X" | "O"
export type Cell = Player | ""
export type Result = Player | "tie" | undefined

export type CurrentGame = {
    currentPlayer: Player
    board: Cell[][]
    result?: Result
}
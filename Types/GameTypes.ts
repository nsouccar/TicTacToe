
export type Player = "X" | "O"
export type Cell = Player | ""
export type Result = Player | "tie" | undefined

export type Game = {
    currentPlayer: Player
    board: Cell[][]
    result?: Result
    gameId: string
}
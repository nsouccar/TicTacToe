import express from "express";
const cors = require('cors')
import type { Request, Response } from "express";
const app = express()
app.use(cors())

import { changeGameState } from "./GameState"

import type { Player, Game, Cell, Result } from "../../Types/GameTypes.ts"


app.use(express.json())

const empty: Cell = ""

const initialBoard = [

    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]


]


export let currentGame: Game = {
    currentPlayer: "X",
    board: initialBoard,
    result: undefined
}


app.get('/', (request: Request, response: Response) => {
    response.send(currentGame)
})

app.post('/', (request: Request, response: Response) => {
    currentGame = changeGameState(currentGame, request.body[0], request.body[1])
    response.json(currentGame)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log('Server running on port ', { PORT })
})


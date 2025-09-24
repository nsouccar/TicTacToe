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

// gameId1: {game1}
// gameId2: {game2}
let games: Record<string, Game> = {}




app.get('/:id/play', (request: Request, response: Response) => {
    console.log("games", games)
    const gameId = request.params.id as string
    if (games[gameId]) {
        console.log("hello")
        response.send(games[gameId])
    } else {
        response.status(404).send("Page not found")
    }
})

app.post('/:id/play', (request: Request, response: Response) => {



    const gameId = request.params.id as string
    if (games[gameId]) {
        let game = games[gameId]
        game = changeGameState(game!, request.body[0], request.body[1])
        console.log("GAME", game)
        response.send(game)
    } else {
        response.status(404).send("Page not found")
    }

})

app.get('/', (request: Request, response: Response) => {

    response.send(games)

})


// TODO: this is actually "create or join"
app.post('/join/', (request: Request, response: Response) => {
    console.log("joining")
    // THE CLIENT CREATES THE ID:
    const gameId = request.body as string

    if (games[gameId]) {
        console.log("games", games)


        return games[gameId]
    }


    let currentGame: Game = {
        currentPlayer: "X",
        board: initialBoard,
        result: undefined,
        gameId: gameId
    }

    games[gameId] = currentGame
    console.log("games", games)
    response.json(currentGame)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log('Server running on port ', { PORT })
})


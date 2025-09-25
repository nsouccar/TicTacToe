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

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});


app.get('/:id/play', (request: Request, response: Response) => {
    const gameId = request.params.id as string
    console.log("current game: ", gameId)
    if (games[gameId]) {
        console.log("current game: ", games[gameId])
        response.send(games[gameId])

    } else {
        response.status(404).send("Page not found")
    }
})

app.post('/:id/play', (request: Request, response: Response) => {
    const gameId = request.params.id as string
    if (games[gameId]) {
        let game = games[gameId]
        console.log(`request ${request.body}`)
        const move = request.body.move
        games[gameId] = changeGameState(game!, move[0], move[1])
        response.send(games[gameId])
    } else {
        response.status(404).send("Page not found")
    }
})

app.get('/', (request: Request, response: Response) => {
    response.send(games)
})

// TODO: this is actually "create or join"
app.post('/join', (request: Request, response: Response) => {
    // THE CLIENT CREATES THE ID:
    const gameId = request.body.gameId as string
    console.log(`request body keys: ${request.body.keys}`)
    console.log(`body ${request.body}`)
    console.log(gameId, " joining")

    if (games[gameId]) {
        return response.json(games[gameId])
    }


    let currentGame: Game = {
        currentPlayer: "X",
        board: initialBoard,
        result: undefined,
        gameId: gameId
    }

    games[gameId] = currentGame
    response.json(currentGame)
    console.log("new game created: ", currentGame)
})


const PORT = 3000
app.listen(PORT, () => {
})


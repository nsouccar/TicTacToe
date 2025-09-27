import express from "express";
const cors = require('cors')
import type { Request, Response } from "express";
const app = express()
app.use(cors())

import { changeGameState } from "./GameState.ts"

import type { Player, Game, Cell, Result } from "../../Types/GameTypes.ts"
import { addGameToDB, getGamesFromDB, updateDB } from "./index.ts"


app.use(express.json())


const empty: Cell = ""

const initialBoard = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]
]



async function checkForGame(gameId: string) {
    const gamesInDB = await getGamesFromDB()

    const game = gamesInDB.find(g => g.gameId.trim() === gameId.trim())
    if (game) {
        console.log("current game: ", game)
        return (game)

    } else {
        return null
    }

}



app.get('/:id/play', async (request: Request, response: Response) => {
    const gameId = request.params.id as string
    let gameExists = await checkForGame(gameId)


    if (gameExists) {
        response.send(gameExists)
    } else {
        response.status(404).send("Page not found")
    }




})

app.post('/:id/play', async (request: Request, response: Response) => {
    debugger
    const gameId = request.params.id as string
    let gameExists = await checkForGame(gameId)
    if (gameExists) {
        const move = request.body.move
        const newBoard = changeGameState(gameExists as Game, move[0], move[1])
        await updateDB(gameId, newBoard)
        response.send("Move made")
    } else {
        response.status(404).send("Page not found")
    }
})

app.get('/', async (request: Request, response: Response) => {
    const gamesInDB = await getGamesFromDB()
    return response.send(gamesInDB)
})



app.post('/join', async (request: Request, response: Response) => {

    const gameId = crypto.randomUUID()
    console.log("SKLDJAHFKJHSDF", request.body.gameName)



    let currentGame: Game = {
        currentPlayer: "X",
        board: initialBoard,
        result: undefined,
        gameId: gameId,
        name: request.body.gameName
    }
    try {
        await addGameToDB(currentGame)
        return response.json(currentGame)

    } catch (error) {
        return (error)

    }




    // games[gameId] = currentGame
    response.json(currentGame)
    // console.log("new game created: ", currentGame)
})





const PORT = 3000
app.listen(PORT, () => {
})





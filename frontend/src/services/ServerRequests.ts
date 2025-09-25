import axios from 'axios'
import type { Game } from "../../../Types/GameTypes.ts"

const baseUrl = "http://localhost:3000"

export function getCurrentBoard(gameId: String): Promise<Game> {
    const url = `${baseUrl}/${gameId}/play`
    console.log(`game ID = ${gameId}`)
    console.log(url);
    const request = axios.get(url)
    return request.then(response => response.data)
}

export function makeMove(move: number[] | null, gameId: String): Promise<Game> {
    console.log("move recieved: ", move)
    const request = axios.post(baseUrl + "/" + gameId + "/play", { move })
    return request.then(response => response.data)
}

export function getCurrentGames() {
    const request = axios.get(baseUrl + "/")
    return request.then(response => response.data)
}

export async function startNewGame(gameId: String) {
    console.log("starting new game")
    const data = { gameId: gameId };
    const response = await axios.post(baseUrl + "/join", data)
    console.log("response recived: ", response.data)
    return response.data
}




import axios from 'axios'
import type { Game } from "../../../Types/GameTypes.ts"

const baseUrl = "http://localhost:3000"


export function getCurrentBoard(gameId: String): Promise<Game> {

    const request = axios.get(baseUrl + "/" + gameId + "/play")
    return request.then(response => response.data)
}

export function makeMove(move: number[] | null, gameId: String): Promise<Game> {
    const request = axios.post(baseUrl + "/" + gameId + "/play", move)
    return request.then(response => response.data)
}

export function getCurrentGames() {
    const request = axios.get(baseUrl + "/")
    return request.then(response => response.data)

}

export function startNewGame(gameId: String) {
    const request = axios.post(baseUrl + "/join", gameId)
    return request.then(response => response.data)
}




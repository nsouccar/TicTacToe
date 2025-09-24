import axios from 'axios'
import type { Player, Game, Cell, Result } from "../../../Types/GameTypes.ts"

const baseUrl = "http://localhost:3000"

export function getCurrentBoard(): Promise<Game> {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export function makeMove(move: number[]): Promise<Game> {
    const request = axios.post(baseUrl, move)
    return request.then(response => response.data)
}


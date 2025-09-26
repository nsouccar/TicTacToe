import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ticTacToes } from './db/schema'
import type { Game } from "../../Types/GameTypes"
require('dotenv').config({ path: '../DATABASE.env' })


console.log("string", process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL

export const client = postgres(connectionString!, { prepare: false })
export const db = drizzle(client);

export async function testConnection(game: Game) {
    console.log("adding")
    await db.insert(ticTacToes).values(

        {

            id: game.gameId,
            board: game.board,
            result: "",
            currentPlayer: game.currentPlayer
        }





    )

}




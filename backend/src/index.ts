import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ticTacToes } from './db/schema'
import type { Game } from "../../Types/GameTypes"
require('dotenv').config({ path: '../DATABASE.env' })
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";



console.log("string", process.env.DATABASE_URL)

const connectionString = process.env.DATABASE_URL

export const client = postgres(connectionString!, { prepare: false })
export const db = drizzle(client);

export async function addGameToDB(game: Game) {
    console.log("adding")

    await db.insert(ticTacToes).values(

        {

            gameId: game.gameId,
            board: game.board,
            result: "",
            currentPlayer: game.currentPlayer,
            name: game.name
        }





    )

}

export async function getGamesFromDB() {
    const rows = await db.select().from(ticTacToes)
    return rows

}


export async function updateDB(id: string, newBoard: Game) {
    console.log("Board type:", typeof newBoard.board, Array.isArray(newBoard.board));
    await db.update(ticTacToes)
        .set({ board: newBoard.board, currentPlayer: newBoard.currentPlayer, result: newBoard.result })
        .where(eq(ticTacToes.gameId, id));




}




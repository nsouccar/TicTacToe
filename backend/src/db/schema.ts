import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const ticTacToes = pgTable("games", {

    gameId: varchar().primaryKey(),
    board: json().notNull(),
    result: varchar({ length: 3 }),
    currentPlayer: varchar({ length: 1 }),
    name: varchar()





})




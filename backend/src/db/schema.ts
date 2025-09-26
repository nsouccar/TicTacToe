import { integer, pgTable, varchar, json } from "drizzle-orm/pg-core";

export const ticTacToes = pgTable("games", {
    id: varchar().notNull(),
    board: json().notNull(),
    result: varchar({ length: 3 }),
    currentPlayer: varchar({ length: 1 })





})




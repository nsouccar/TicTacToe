import { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentGames, startNewGame } from './services/ServerRequests'
import GameComponent from './GameComponent'
import type { Game } from "../../Types/GameTypes.ts"


function App() {
    const [page, setPage] = useState("home")
    const [gameId, setGameId] = useState("")
    const [currentGames, setCurrentGames] = useState<Record<string, Game> | null>(null)

    useEffect(() => {
        getCurrentGames().then(currentGames => setCurrentGames(currentGames))
    }, [currentGames])

    async function create() {
        const newGameId = crypto.randomUUID()
        setGameId(newGameId)
        try {
            await startNewGame(newGameId)
            setPage("game")
        } catch (err) {
            console.log("Failed to start game: ", err)
        }
    }

    function backHome() {
        setPage("home")
    }

    async function goToGame(event: React.MouseEvent<HTMLButtonElement>) {
        const id = event.currentTarget.id
        await setGameId(id)
        await startNewGame(gameId)
        setPage("game")


    }



    if (page === "home") {





        return (
            <div className="flex items-center justify-center h-screen">
                <button onClick={create}>Create Game</button>
                <ul>

                    {
                        Object.entries(currentGames ?? {}).map(([gameId, game]) => (
                            <li> <button id={gameId} onClick={goToGame}>{gameId}</button></li>
                        ))
                    }

                </ul>


            </div>

        )
    } else {
        return (
            <>
                <GameComponent gameId={gameId!} />
                <button onClick={backHome}>Back</button >
            </>

        )
    }

}

export default App
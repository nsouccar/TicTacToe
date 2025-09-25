import { useState } from 'react'
import { getCurrentGames, startNewGame } from './services/ServerRequests'
import GameComponent from './GameComponent'



function App() {
    const [page, setPage] = useState("home")
    const [gameId, setGameId] = useState("")

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

    if (page === "home") {
        return (
            <div className="flex items-center justify-center h-screen">
                <button onClick={create}>Create Game</button>
            </div>

        )
    } else {
        return (<GameComponent gameId={gameId!} />)
    }

}

export default App
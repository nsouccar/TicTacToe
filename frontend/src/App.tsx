import { useState } from 'react'
import { getCurrentGames, startNewGame } from './services/ServerRequests'
import GameComponent from './GameComponent'



function App() {

    const [page, setPage] = useState("home")

    let newGameId: String;

    async function create() {

        let currGames = await getCurrentGames()
        newGameId = crypto.randomUUID();
        startNewGame(newGameId)

        setPage("game")




    }



    if (page === "home") {
        return (<button onClick={create}>Create Game</button>)
    } else {
        return (<GameComponent gameId={newGameId!} />)
    }

}

export default App
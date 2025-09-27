import { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentBoard, getCurrentGames, startNewGame } from './services/ServerRequests'
import GameComponent from './GameComponent'
import type { Game } from "../../Types/GameTypes.ts"
import { motion } from "motion/react"
import pill from "./assets/pill.png";
import Popup from './Popup.tsx'
import FuzzyText from './FuzzyText';


function App() {
    const [page, setPage] = useState("home")
    const [gameId, setGameId] = useState("")
    const [currentGames, setCurrentGames] = useState<Record<string, Game> | null>(null)
    const [gameName, setGameName] = useState("")

    useEffect(() => {
        getCurrentGames().then(currentGames => setCurrentGames(currentGames))
    }, [currentGames])

    function create() {
        setPage("popup")
    }



    function backHome() {
        setPage("home")
    }

    async function goToGame(event: React.MouseEvent<HTMLButtonElement>) {
        const id = event.currentTarget.id
        await setGameId(id)
        await getCurrentBoard(gameId)
        setPage("game")


    }

    async function getData(name: string) {

        try {
            console.log("GMMMMMNAME", name)
            const game = await startNewGame(name)
            setGameId(game.gameId)
            setGameName(name)
            setPage("game")
        } catch (err) {
            return (err)

        }


    }



    if (page === "home") {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black">


                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={1}
                    enableHover={true}
                    fontSize={30}
                >TICTACTOE</FuzzyText>

                <button onClick={create} className="text-white">Create Game</button>
                <ul>

                    {
                        Object.entries(currentGames ?? {}).map((game) => (
                            <li> <button className="text-white" id={game[1].gameId} onClick={goToGame}>{game[1].name}</button></li>
                        ))
                    }

                </ul>

            </div>

        )
    } else if (page === "popup") {
        return (
            <Popup passDataToApp={getData} />
        )
    }


    else {
        return (
            <>
                <GameComponent gameId={gameId!} gameName={gameName} />
                <button onClick={backHome}>Back</button >
            </>

        )
    }

}

export default App
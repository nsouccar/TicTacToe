import { useState } from 'react'
import { useEffect } from 'react'
import { getCurrentBoard, getCurrentGames, startNewGame } from './services/ServerRequests'
import GameComponent from './GameComponent'
import type { Game } from "../../Types/GameTypes.ts"
import { motion } from "motion/react"
import pill from "./assets/pill.png";
import FuzzyText from './FuzzyText';


function App() {
    const [page, setPage] = useState("home")
    const [gameId, setGameId] = useState("")
    const [currentGames, setCurrentGames] = useState<Record<string, Game> | null>(null)
    const [gameName, setGameName] = useState("")

    useEffect(() => {
        getCurrentGames().then(currentGames => setCurrentGames(currentGames))
    }, [currentGames])

    async function create() {


        try {
            console.log("enter create function")
            debugger
            const game = await startNewGame()
            console.log("object", game.gameId)
            setGameId(game.gameId)
            setPage("game")
        } catch (err) {
            console.log("Failed to start game: ", err)
        }
    }

    function handleInputFromPopup(gameName: string) {
        setGameName(gameName)
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



    if (page === "home") {





        return (
            <div className="flex flex-col justify-center h-screen bg-black">


                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                    fontSize={20}
                >TICTACTOE</FuzzyText>





                <button onClick={create} className="text-white">Create Game</button>
                <ul>

                    {
                        Object.entries(currentGames ?? {}).map(([gameId, game]) => (
                            <li> <button className="text-white" id={gameId} onClick={goToGame}>{gameId}</button></li>
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
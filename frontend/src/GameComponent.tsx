
import { useState } from 'react'
import { useEffect } from 'react'
import type { Game } from "../../Types/GameTypes.ts"
import { getCurrentBoard, makeMove } from './services/ServerRequests.ts'

function GameComponent(props: { gameId: String }) {






  const [currentGameState, setBoard] = useState<Game | null>(null)
  const [cellClicked, setCell] = useState<number[] | null>(null)

  useEffect(() => {
    getCurrentBoard(props.gameId).then(currentGame => {
      setBoard(currentGame)
    })
  }, [cellClicked])

  function click(event: React.MouseEvent<HTMLDivElement>) {
    const clickedCell: string = event.currentTarget.id

    const row = Number(clickedCell[0])
    const col = Number(clickedCell[1])
    makeMove([row, col], props.gameId)
    setCell([row, col])
  }


  return (
    <>
      <header>

      </header>
      <h1>{currentGameState?.result || ""}</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 place-content-center">
        <div id="00" onClick={click} className="grid-item">{currentGameState?.board[0][0] || ""}</div>
        <div id="01" onClick={click} className="grid-item">{currentGameState?.board[0][1] || ""}</div>
        <div id="02" onClick={click} className="grid-item">{currentGameState?.board[0][2] || ""}</div>
        <div id="10" onClick={click} className="grid-item">{currentGameState?.board[1][0] || ""}</div>
        <div id="11" onClick={click} className="grid-item">{currentGameState?.board[1][1] || ""}</div>
        <div id="12" onClick={click} className="grid-item">{currentGameState?.board[1][2] || ""} </div>
        <div id="20" onClick={click} className="grid-item">{currentGameState?.board[2][0] || ""}</div>
        <div id="21" onClick={click} className="grid-item">{currentGameState?.board[2][1] || ""}</div>
        <div id="22" onClick={click} className="grid-item">{currentGameState?.board[2][2] || ""}</div>


      </div>

    </>
  )
}

export default GameComponent

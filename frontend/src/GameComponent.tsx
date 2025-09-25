
import { useState } from 'react'
import { useEffect } from 'react'
import type { Game } from "../../Types/GameTypes.ts"
import { getCurrentBoard, makeMove } from './services/ServerRequests.ts'




function GameComponent(props: { gameId: String }) {
  const [board, setBoard] = useState<Game | null>(null)
  const [cellClicked, setCell] = useState<number[] | null>(null)

  useEffect(() => {
    getCurrentBoard(props.gameId).then(currentGame => {
      setBoard(currentGame)
    })
  }, [props.gameId])

  async function click(event: React.MouseEvent<HTMLDivElement>) {
    const clickedCell: string = event.currentTarget.id

    const row = Number(clickedCell[0])
    const col = Number(clickedCell[1])
    await makeMove([row, col], props.gameId)

    const board = await getCurrentBoard(props.gameId)
    console.log("new board:", board.board)

    setBoard(board)
  }

  return (
    <>
      <header>

      </header>
      <h1>{board?.result || ""}</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 place-content-center">
        <div id="00" onClick={click} className="grid-item">{board?.board[0][0] || ""}</div>
        <div id="01" onClick={click} className="grid-item">{board?.board[0][1] || ""}</div>
        <div id="02" onClick={click} className="grid-item">{board?.board[0][2] || ""}</div>
        <div id="10" onClick={click} className="grid-item">{board?.board[1][0] || ""}</div>
        <div id="11" onClick={click} className="grid-item">{board?.board[1][1] || ""}</div>
        <div id="12" onClick={click} className="grid-item">{board?.board[1][2] || ""} </div>
        <div id="20" onClick={click} className="grid-item">{board?.board[2][0] || ""}</div>
        <div id="21" onClick={click} className="grid-item">{board?.board[2][1] || ""}</div>
        <div id="22" onClick={click} className="grid-item">{board?.board[2][2] || ""}</div>
      </div>

    </>
  )
}

export default GameComponent

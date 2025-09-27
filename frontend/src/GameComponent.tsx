
import { useState } from 'react'
import { useEffect } from 'react'
import type { Game } from "../../Types/GameTypes.ts"
import { getCurrentBoard, makeMove } from './services/ServerRequests.ts'
import { motion } from "motion/react"


let currentColor = "#d2f2ec"

function GameComponent(props: { gameId: String, gameName: String }) {
  console.log("GAMENAME", props.gameName)
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



    setBoard(board)
    if (board.currentPlayer === "X") {
      currentColor = "#00f04f"
    } else {
      currentColor = "#d2f2ec"
    }
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <h1 className="font-bold">{(board?.result + " wins!") || ""}</h1>
        <motion.div className="grid grid-cols-3 grid-rows-3 gap-4 aspect-square w-[50vw]">
          {board?.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                whileHover={{ backgroundColor: currentColor }}

                key={`${rowIndex}${colIndex}`}
                id={`${rowIndex}${colIndex}`}
                onClick={click}
                className="flex items-center justify-center text-3xl font-bold border border-gray-400"
              >
                {cell || ""}
              </motion.div >
            ))
          )
          }
        </motion.div >
      </div>


    </>
  )
}

export default GameComponent

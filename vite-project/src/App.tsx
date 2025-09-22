
import {useState} from 'react'
import {changeGameState} from './CurrentGame.ts'
import type {CurrentGame, Player, Cell} from './CurrentGame.ts'


function App() {

  const empty: Cell = ""

  const initialBoard =   [
    
    [empty, empty, empty],
    [empty,empty, empty,],
    [empty, empty, empty]
  ]

    const initialGame: CurrentGame = {
        currentPlayer: "X",
        board: initialBoard
   
    }


   

  const [currentGameState, setBoard] = useState(initialGame)

  function cellClicked(event: React.MouseEvent<HTMLDivElement> ) {
    const clickedCell: string = event.currentTarget.id
    const row = Number(clickedCell[0])
    
    const column = Number(clickedCell[1])
    setBoard(changeGameState(currentGameState, row, column ))
  }

  return (
    <>
    <header>

    </header>
    <div className="grid grid-cols-3 grid-rows-3 gap-4 place-content-center">
      <div id="00"   onClick = {cellClicked} className="grid-item">{currentGameState.board[0][0]}</div>
      <div id = "01" onClick = {cellClicked} className="grid-item">{currentGameState.board[0][1]}</div>
      <div id = "02" onClick = {cellClicked} className="grid-item">{currentGameState.board[0][2]}</div>
      <div id= "10"  onClick = {cellClicked} className="grid-item">{currentGameState.board[1][0]}</div>
      <div id="11"   onClick = {cellClicked} className="grid-item">{currentGameState.board[1][1]}</div>
      <div id="12"   onClick = {cellClicked} className="grid-item">{currentGameState.board[1][2]}</div>
      <div id="20"   onClick = {cellClicked} className="grid-item">{currentGameState.board[2][0]}</div>
      <div id="21"   onClick = {cellClicked} className="grid-item">{currentGameState.board[2][1]}</div>
      <div id="22"   onClick = {cellClicked} className="grid-item">{currentGameState.board[2][2]}</div>


    </div>
      
    </>
  )
}

export default App

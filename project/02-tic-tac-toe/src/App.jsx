import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const TURNS = {
  X: 'x', 
  O: 'o'
}

const WINNER_COMBOS =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


const Square = ({children, isSelected, updateBoard, index}) =>{
  const className = `square ${isSelected ? 'is-selected' :''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {
  // const [board, serBoard] = useState(['x', 'o', 'x','x', 'o', 'x','x', 'o', 'x'])
  const [board, serBoard] = useState(Array(9).fill(null))
  const [turn, serTurn] = useState(TURNS.X)
  //null es que no hay ganador, false es que hay empate 
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck)=>{
    // revisamos todas las combinaciones ganadoras
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] && //0 -->x u o
        boardToCheck[a]==boardToCheck[b] &&
        boardToCheck[a]==boardToCheck[c]
        ){
          return boardToCheck[a] //0 --> x u o
        }
    }
    //si no hay gaanador
    return null
  }

  const updateBoard = (index) =>{
    //no actualizamos esta posicion si ya tiene algo
    if (board[index] || winner) return
    //spread rest operator
    
    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    serBoard(newBoard) 
    //actualizar turno
    const newTurn = turn==TURNS.X ? TURNS.O : TURNS.X
    serTurn(newTurn)

    //revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      // alert(`el gaanador es ${newWinner}`)
      console.log(`el gaanador es ${newWinner}`)
    }
  }

  console.log(board)
  return (
    <main className='board'>
      <h1> tic tac</h1>
      <section className='game'>
        {
          board.map((_, index) =>{
            return(
                <Square 
                  key={index} 
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn==TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn==TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
    
  )
}

export default App

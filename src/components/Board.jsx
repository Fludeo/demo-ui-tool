import React from 'react'
import '../styles/Board.css'
const Board = ({title,info}) => {
  return (
    <div className='board-container'>
      <h3 className='board-title'>{ title}</h3>
     <pre style={{textAlign:'start'}}>
      {JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}

export default Board

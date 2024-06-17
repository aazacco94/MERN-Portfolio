import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSwitchPlayer, onWinner, turns}) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  let gameBoard = initialGameBoard;

  for(const turn of turns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSwitchPlayer();
  // }

  function handleOnClick(rowIndex, colIndex, gameBoard, turns){
    onSwitchPlayer(rowIndex, colIndex);
    if(turns.length >= 4){
      const isWinner = onWinner(gameBoard, turns[0].player);
      console.log(`Found Winner: ${isWinner}`);
    }
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button 
                  onClick={() => handleOnClick(rowIndex, colIndex, gameBoard, turns)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
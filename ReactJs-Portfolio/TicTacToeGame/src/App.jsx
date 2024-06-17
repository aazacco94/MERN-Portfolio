import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  
  const activePlayer = deriveActivePlayer(gameTurns);
  
  function evaluateWinner(gameBoard, currentPlayer){
    //check horizontal win
    let isWinner = false;
  
    console.log(gameBoard);
    console.log(gameBoard[0]);
    console.log(gameBoard[1]);
    console.log(gameBoard[2]);
    console.log(currentPlayer);
  
    let totalCount = 0;
    let x = 0;
    let y = 0;
  
    //Evaulate Horizontal Winner
    for(x = 0; !isWinner && (x <= gameBoard.length - 1); x++){
      let fullRow = gameBoard[x];
  
      console.log('Evaulte Row:');
      console.log(fullRow);
  
      for(y = 0; y <= fullRow.length - 1; y++){
        if(fullRow[y] === currentPlayer){
          totalCount++;
          console.log(`Count: ${totalCount}`);
        }
      }
  
      if(totalCount === 3){
        isWinner === true;
      }else{
        totalCount = 0;
      }
    }
  
    //Evaulate Vertical Winner
    for(y = 0; !isWinner && (y <= 2); y++){
      for(x = 0; x <= 2; x++){
        console.log(`Position: (${x},${y}),  Value: ${gameBoard[x][y]}, Player: ${currentPlayer}`);
        if(gameBoard[x][y] === currentPlayer){
          totalCount++;
          console.log(`Count: ${totalCount}`);
        }
      }
  
      if(totalCount === 3){
        isWinner === true;
      }else{
        totalCount = 0;
      }
    }
  
    //Evaulate Upper Diagonal Winner
    if(!isWinner){
      x = 0;
      y = 0;
  
      while(x <= 2 && y <= 2){
        if(gameBoard[x][y] === currentPlayer){
          totalCount++;
        }
        x++;
        y++;
      }
  
      if(totalCount === 3){
        isWinner === true;
      }else{
        totalCount = 0;
      }
    }
    
    //Evaulate Lower Diagonal Winner
    x = 0;
    y = 2;
  
    while(x <= 2 && y >= 0 && !isWinner){
      if(gameBoard[x][y] === currentPlayer){
        totalCount++;
      }
  
      x++;
      y--;
    
      if(totalCount === 3){
        isWinner === true;
      }else{
        totalCount = 0;
      }
    }
  
  return isWinner;
  }

  function handleSwitchPlayer(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
      ...prevTurns
      ];
    
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'}
          />
          <Player 
            initName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSwitchPlayer={handleSwitchPlayer} onWinner={evaluateWinner} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
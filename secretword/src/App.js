import './styles/App.css';


import { useState } from 'react';
import { wordsList } from './data/words';


import StartScreen from './components/StartScreen.js';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {
    
  const [gameStage] = useState(stages[0].name);
  
  const [words] = useState(wordsList);

  console.log(words)

  return (
    <div className="App">
      { gameStage === 'start' && <StartScreen />}    
      { gameStage === 'game' && <Game />}
      {gameStage === 'end' && <GameOver />}
    </div>
  );
}

export default App;

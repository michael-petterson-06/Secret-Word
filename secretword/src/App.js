import './styles/App.css';


import { useEffect, useState } from 'react';
import { wordsList } from './data/words';


import StartScreen from './components/StartScreen.js';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

const guessesQtd = 3;

function App() {
    
  const [words] = useState(wordsList);
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [pickedWord, setPickedWord] = useState('');
  const [pikedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  
  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
     
    const word = 
      words[category][Math.floor(Math.random() * words[category].length)];

     return { category, word } 
  }

  const startGame = () => {
    const {category, word } = pickWordAndCategory()
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((Letter) => Letter.toLowerCase())
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }


  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase();
    if (
      guessedLetters.includes(normalizeLetter) || 
      wrongLetters.includes(normalizeLetter)
    ){ return; }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actuaGuessedLetters) => [
        ...actuaGuessedLetters, normalizeLetter
      ])
    } else {
      setWrongLetters((actuaWrongLetters) => [
        ...actuaWrongLetters, normalizeLetter
      ]) 

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
    
  useEffect(() =>{
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses])

  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      { gameStage === 'start' && <StartScreen startGame={startGame}/>}    

      { gameStage === 'game' && <Game
         verifyLetter={verifyLetter}
         pickedWord={pickedWord}
         setPickedCategory={pikedCategory}
         letters={letters}
         guessedLetters={guessedLetters}
         wrongLetters={wrongLetters}
         guesses={guesses}
         score={score}
      />}

    { gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;

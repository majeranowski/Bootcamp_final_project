// Hangman app using react. I was making sure I involved all the task requiremenets in the app
// I have read a lot of online resources and watched a lot of tutorials to build this app
//examples of resources:
//https://www.youtube.com/watch?v=82-Gnw-rBiQ&t=454s&ab_channel=SimonSuh
//https://morioh.com/p/1a4542f3039a
//but had to make it more complex to make sure task requirements are met
// For styling components I have used materializecss buttons, containers and blockquotes

import React, { useState, useEffect } from "react";
import "./App.css";
import 'materialize-css/dist/css/materialize.min.css'

import Header from "./Components/Header";
import Deadman from "./Components/Deadman";
import WrongLetters from "./Components/WrongLetters";
import Word from "./Components/Word";
import Message from "./Components/FinalMessage";

//array of available words to be guessed. Hard coded in the app
const words = ["orange", "apple", "watermelon", "carrot", "pear", "mango", "potato"];
//Random word generator.
let randomWord = words[Math.floor(Math.random() * words.length)];

function App() {
  //setting the states using useState hooks
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  //the following code will execute whenever the states changes
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        //checking if the word includes the letter that user inputs
        if (randomWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            //updating current states
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            alert("Don't enter the same letter twice");
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            alert("Don't enter the same letter twice");
          }
        }
      }
    };

    //an event listener is added to listen for user entries
    window.addEventListener("keydown", handleKeydown);

    //event listener is removed when component is unmounted
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  //Function that will reset the game to the starging stage with new word
  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    //randomly selects a word
    const random = Math.floor(Math.random() * words.length);
    randomWord = words[random];
  }
  //Hint and Help functions
  function help() {
    alert(`Guess the word by typing the letter on your keybord. Don't let the man die!`);
  }

  function hint() {
    alert(`It is either fruit or vegetable`);
  }

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col s8">
        <Deadman wrongLetters={wrongLetters} />
        <Word selectedWord={randomWord} correctLetters={correctLetters} />
        <br></br>
        <WrongLetters wrongLetters={wrongLetters} />
        
      </div>
      
      <div className="col s4">
      <Message
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={randomWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <br></br>
      <a className="waves-effect waves-light btn-small" onClick={() => help()}>Help</a>
      <br></br>
      <a className="waves-effect waves-light btn-small" onClick={() => hint()}>Hint</a>
    </div>
    </div>
    </div>
  );
}

export default App;

import React from "react";

const WrongLetters = ({ wrongLetters }) => {
  return (
    // prints out the wrong letters the user entered using .map method that was specified in the task description
    //Firstly we check for the length of the word and if the word actually exists
    //Later on we trigger .map function for each element and later on reducer method with callback function to display wrong letters accordingly 
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 ? <p>Wrong Letters:</p> : null}
        {wrongLetters
          .map((letter, i) => <span key={i}>{letter}</span>)
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, " - ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default WrongLetters;

import React, { useState, useRef } from "react";
import { message, Button } from "antd";
import "./index.scss";

const targetWords = ["test", "wordsf", "ply", "rea", "d"];
const attempts = 6;

const App = () => {
  const [level, setLevel] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [inputs, setInputs] = useState(
    Array(attempts)
      .fill("")
      .map(() => Array(targetWords[level].length).fill(""))
  );
  const [results, setResults] = useState(
    Array(attempts)
      .fill("")
      .map(() => Array(targetWords[level].length).fill(""))
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const inputRefs = useRef(
    Array(attempts)
      .fill("")
      .map(() =>
        Array(targetWords[level].length)
          .fill(null)
          .map(() => React.createRef())
      )
  );

  const handleChange = (rowIndex, colIndex, event) => {
    if (currentAttempt !== rowIndex) return; // Prevent editing previous attempts
    const newInputs = [...inputs];
    newInputs[rowIndex][colIndex] = event.target.value;
    setInputs(newInputs);

    // Move to the next input if available
    if (colIndex < targetWords[level].length - 1) {
      const nextInputRef = inputRefs.current[rowIndex][colIndex + 1];
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const checkInputs = () => {
    if (currentAttempt >= attempts) return;

    const currentInputs = inputs[currentAttempt];
    if (currentInputs.some((input) => input === "")) {
      messageApi.open({
        type: "error",
        content: "לא מולאו כל האותיות",
      });
      // alert("Please fill in all inputs before checking.");
      return;
    }

    const newResults = [...results];
    const newRowResults = currentInputs.map((input, index) => {
      if (input === targetWords[level][index]) {
        return "green";
      } else if (targetWords[level].includes(input)) {
        return "yellow";
      } else {
        return "";
      }
    });

    newResults[currentAttempt] = newRowResults;
    setResults(newResults);

    if (currentInputs.join("") === targetWords[level]) {
      //alert("Congratulations! You guessed the word!");
      setGameOver(true);
    } else if (currentAttempt === attempts - 1) {
      //alert(`Game over! The correct word was "${targetWords[level]}".`);
      setGameOver(true);
    }

    setCurrentAttempt(currentAttempt + 1);
  };

  const nextLevel = () => {
    const nextLevel = level + 1;
    if (nextLevel < targetWords.length) {
      setLevel(nextLevel);
      setInputs(
        Array(attempts)
          .fill("")
          .map(() => Array(targetWords[nextLevel].length).fill(""))
      );
      setResults(
        Array(attempts)
          .fill("")
          .map(() => Array(targetWords[nextLevel].length).fill(""))
      );
      setCurrentAttempt(0);
      setGameOver(false);

      // Reset inputRefs for new level
      inputRefs.current = Array(attempts)
        .fill("")
        .map(() =>
          Array(targetWords[nextLevel].length)
            .fill(null)
            .map(() => React.createRef())
        );

      // Focus on the first input of the new level
      if (inputRefs.current[0][0] && inputRefs.current[0][0].current) {
        inputRefs.current[0][0].current.focus();
      }
    } else {
      setIsGameOver(true);
      //alert("Congratulations! You have completed all levels!");
    }
  };

  return (
    <div className="container">
      {contextHolder}
      {!isGameOver ? (
        <div className="input-grid">
          {inputs.map((row, rowIndex) => (
            <div key={rowIndex} className="input-row">
              {row.map((input, colIndex) => (
                <input
                  className="pin-input"
                  key={colIndex}
                  ref={inputRefs.current[rowIndex][colIndex]}
                  value={input}
                  onChange={(e) => handleChange(rowIndex, colIndex, e)}
                  style={{ borderColor: results[rowIndex][colIndex] }}
                  maxLength={1}
                  disabled={rowIndex !== currentAttempt || gameOver}
                  autoFocus={
                    rowIndex === currentAttempt && colIndex === 0 && !gameOver
                  } // Autofocus on the first input of current attempt
                />
              ))}
            </div>
          ))}
          {!gameOver ? (
            <Button
              className="my-button"
              onClick={checkInputs}
              disabled={currentAttempt >= attempts}
            >
              בדוק מילה
            </Button>
          ) : (
            <Button className="my-button" onClick={nextLevel}>
              עבור למילה הבא
            </Button>
          )}
        </div>
      ) : (
        <h2 className="game-over-title">כל הכבוד! המשחק הסתיים :)</h2>
      )}
    </div>
  );
};

export default App;

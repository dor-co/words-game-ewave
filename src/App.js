import React, { useState, useRef, useEffect } from "react";
import { message, Button, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.scss";
import Results from "./Results";

const attempts = 6;
const numberOfGroups = 4;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { game } = location.state;
  const [level, setLevel] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [inputs, setInputs] = useState(
    Array(attempts)
      .fill("")
      .map(() => Array(game.words[level].length).fill(""))
  );
  const [results, setResults] = useState(
    Array(attempts)
      .fill("")
      .map(() => Array(game.words[level].length).fill(""))
  );
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [currentGroupScores, setCurrentGroupScores] = useState(
    new Array(4).fill(0)
  );
  const [groupNames, setGroupNames] = useState([
    "קבוצה 1",
    "קבוצה 2",
    "קבוצה 3",
    "קבוצה 4",
  ]);
  const [currentGroupName, setCurrentGroupName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateGroupScore = (groupIndex, score) => {
    const scores = sessionStorage.getItem("score").split(",").map(Number);
    const newScores = [...scores];
    newScores[groupIndex] += score;
    sessionStorage.setItem("score", newScores);
  };

  const inputRefs = useRef(
    Array(attempts)
      .fill("")
      .map(() =>
        Array(game.words[level].length)
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
    if (colIndex < game.words[level].length - 1) {
      const nextInputRef = inputRefs.current[rowIndex][colIndex + 1];
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    setCurrentGroupName(groupNames[level % groupNames.length]);
  }, [level, groupNames]);

  const checkInputs = () => {
    if (currentAttempt >= attempts) return;

    const currentInputs = inputs[currentAttempt];
    if (currentInputs.some((input) => input === "")) {
      messageApi.open({
        type: "error",
        content: "לא מולאו כל האותיות",
      });
      return;
    }

    const newResults = [...results];
    const newRowResults = currentInputs.map((input, index) => {
      if (input === game.words[level][index]) {
        return "green";
      } else if (game.words[level].includes(input)) {
        return "yellow";
      } else {
        return "";
      }
    });

    newResults[currentAttempt] = newRowResults;
    setResults(newResults);

    if (currentInputs.join("") === game.words[level]) {
      const score = calculateScore(currentAttempt);
      setFinalScore(score);

      const groupIndex = level % numberOfGroups;
      updateGroupScore(groupIndex, score);

      setGameOver(true);
    } else if (currentAttempt === attempts - 1) {
      setGameOver(true);
    }

    setCurrentAttempt(currentAttempt + 1);
  };

  const calculateScore = (attemptIndex) => {
    return attempts - attemptIndex;
  };

  const nextLevel = () => {
    const nextLevel = level + 1;
    if (nextLevel < game.words.length) {
      setLevel(nextLevel);
      setInputs(
        Array(attempts)
          .fill("")
          .map(() => Array(game.words[nextLevel].length).fill(""))
      );
      setResults(
        Array(attempts)
          .fill("")
          .map(() => Array(game.words[nextLevel].length).fill(""))
      );
      setCurrentAttempt(0);
      setGameOver(false);
      setFinalScore(null);

      // Reset inputRefs for new level
      inputRefs.current = Array(attempts)
        .fill("")
        .map(() =>
          Array(game.words[nextLevel].length)
            .fill(null)
            .map(() => React.createRef())
        );

      // Focus on the first input of the new level
      if (inputRefs.current[0][0] && inputRefs.current[0][0].current) {
        inputRefs.current[0][0].current.focus();
      }
    } else {
      setIsGameOver(true);
    }
  };

  const onBackToLobby = () => {
    navigate("/");
  };

  return (
    <div className="container">
      {contextHolder}
      <Button onClick={onBackToLobby} className="back-to-lobby-btn">
        חזרה ללובי
      </Button>
      <h1 className="my-h1">קטגוריה: {game.category}</h1>
      <h2 className="my-h2">קבוצה משחקת: {currentGroupName}</h2>
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
            <div>
              <Button className="my-button" onClick={showModal}>
                עבור למילה הבא
              </Button>
              <Modal
                open={isModalOpen}
                onOk={nextLevel}
                onCancel={handleCancel}
              >
                <Results groups={groupNames} scores={currentGroupScores} />
              </Modal>
            </div>
          )}
        </div>
      ) : (
        <h2 className="game-over-title">כל הכבוד! המשחק הסתיים :)</h2>
      )}
    </div>
  );
};

export default App;

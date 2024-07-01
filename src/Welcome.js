import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const names = [
    "אברהם",
    "יצחק",
    "יעקב",
    "משה",
    "אהרן",
    "דוד",
    "שלמה",
    "יוסף",
    "יהושע",
    "שמואל",
    "אדם",
    "חוה",
    "שרה",
    "רבקה",
    "רחל",
    "לאה",
    "מרים",
    "חנה",
    "אסתר",
    "רות",
    "נח",
    "דניאל",
    "עזרא",
    "נחמיה",
    "ישעיהו",
    "ירמיהו",
    "יחזקאל",
    "אליהו",
    "יהונתן",
    "גדעון",
  ];

  const gamesList = [
    { category: "Category 1", words: ["wo", "word2"] },
    { category: "Category 2", words: ["word-asd4", "dsword5", "w6"] },
    { category: "Category 3", words: ["worasdd7", "word8", "wordsds9"] },
    { category: "Category 4", words: ["d10", "word11", "word12"] },
    { category: "Category 5", words: ["word13", "word14", "word15"] },
  ];

  const navigate = useNavigate();
  const numberOfGroups = 4;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const splitIntoMultipleArrays = (array, numberOfGroups) => {
    shuffle(array);

    const result = Array.from({ length: numberOfGroups }, () => []);
    array.forEach((item, index) => {
      result[index % numberOfGroups].push(item);
    });

    return result;
  };

  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const storedGroups = sessionStorage.getItem("groupsList");
    if (storedGroups) {
      setGroupsList(JSON.parse(storedGroups));
    } else {
      sessionStorage.setItem("score", "0,0,0,0");
      const newGroupsList = splitIntoMultipleArrays(names, numberOfGroups);
      sessionStorage.setItem("groupsList", JSON.stringify(newGroupsList));
      setGroupsList(newGroupsList);
    }
  }, []);

  const onStartGame = (game) => {
    navigate("/game", { state: { game } });
  };

  return (
    <div className="lobby-container">
      <h1 className="my-h1">לובי משחק</h1>
      <h2 className="my-h2">קבוצות:</h2>
      <div className="groups-container">
        {groupsList.map((group, groupIndex) => (
          <div key={groupIndex} className="group-container">
            <span className="groud-title">קבוצה {groupIndex + 1}</span>
            {group.map((name, nameIndex) => (
              <span key={nameIndex}>{name} </span>
            ))}
          </div>
        ))}
      </div>

      <div className="button-container">
        {gamesList.map((game, index) => (
          <Button
            key={index}
            className="start-game-btn"
            onClick={() => onStartGame(game)}
          >
            {game.category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

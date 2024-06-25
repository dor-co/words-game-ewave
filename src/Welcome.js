import { Button } from "antd";
import React from "react";
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

  const navigate = useNavigate();

  const onStartGame = () => {
    navigate("/game");
  };

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

  const numberOfGroups = 4;
  const groupsList = splitIntoMultipleArrays(names, numberOfGroups);

  console.log(groupsList);

  return (
    <div className="lobby-container">
      <h1 className="my-h1">לובי משחק</h1>

      <h2 className="my-h2">קבוצות:</h2>
      <div className="groups-container">
        {groupsList.map((group, groupIndex) => (
          <div className="group-container">
            <span className="groud-title">קבוצה {groupIndex + 1}</span>
            {group.map((name, nameIndex) => (
              <span key={nameIndex}>{name} </span>
            ))}
          </div>
        ))}
      </div>

      <Button className="start-game-btn" onClick={onStartGame}>
        למשחק
      </Button>
    </div>
  );
};

export default Welcome;

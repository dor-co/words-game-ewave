import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Results from "./Results";
import { Button } from "antd";

const Welcome = () => {
  const names = [
    "שרון",
    "רחלי",
    "ענבל",
    "אליצור",
    "ניר",
    "טל",
    "מרינה",
    "הדר",
    "אמיר",
    "תהילה",
    "יובל",
    "מאי",
    "אורי",
    "דניאל",
    "עדי",
    "אלכס",
    "דרור",
    "יהונתן",
    "שרה",
  ];

  const gamesList = [
    {
      category: "לקוחות",
      words: [
        "נגה",
        "מזרחי",
        "תעסוקה",
        "פיס",
        "בלורן",
        "שלמה",
        "לאומית",
        "משכל",
        "מכבי",
        "יורודרייב",
        "איכולוב",
        "שמיר",
        "ירושלים",
        "מקדולנדס",
        "עמינח",
        "נתע",
        "ויזה",
        "דיפלומט",
        "אלביט",
        "פלאפון",
        "קליקפדיה",
        "רופין",
        "פזגז",
        "איוויב",
      ],
    },
    {
      category: "מסעדות בסיבוס",
      words: [
        "שניצלס",
        "צוקה",
        "קאמי",
        "אינסלטה",
        "ברונו",
        "גונודלס",
        "גירף",
        "נגיסה",
        "ריבר",
        "גפניקה",
        "טיטו",
        "הממלכה",
      ],
    },
    {
      category: "5 אותיות",
      words: [
        "חברים",
        "ספרים",
        "גלידה",
        "משפחה",
        "חופשה",
        "סיבוס",
        "שממית",
        "משתמש",
        "שירים",
        "תקווה",
        "פיתוח",
        "ניהול",
        "מושלם",
        "בדיקה",
        "שיחות",
        "מימון",
        "עסקית",
        "תוצאה",
        "התקנה",
        "ברקוד",
        "משימה",
        "קישור",
        "חיפוש",
        "באגים",
      ],
    },
    {
      category: "ערים",
      words: [
        "אילת",
        "ירשולים",
        "מודיעין",
        "דימונה",
        "נהריה",
        "הרצליה",
        "רעננה",
        "נתניה",
        "חולון",
        "רחובות",
        "ירוחם",
        "ערד",
        "כרמיאל",
        "מעלות",
        "חיפה",
        "בנימינה",
        "אשדוד",
        "אופקים",
        "קיסריה",
        "עפולה",
      ],
    },
  ];

  const groupNames = [
    "לוחמי הבאגים",
    "סיירת קפה ומאפה",
    "אבירי המקלדת",
    "ציידי החושך",
  ];

  const numberOfGroups = groupNames.length;

  const navigate = useNavigate();

  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    const storedGroups = localStorage.getItem("groupsList");
    if (storedGroups) {
      setGroupsList(JSON.parse(storedGroups));
    } else {
      localStorage.setItem("score", "0,0,0,0");
      const newGroupsList = splitIntoMultipleArrays(names, numberOfGroups);
      localStorage.setItem("groupsList", JSON.stringify(newGroupsList));
      setGroupsList(newGroupsList);
    }
  }, []);

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

  const onStartGame = (game) => {
    navigate("/game", { state: { game, groupNames } });
  };

  return (
    <div className="lobby-container container">
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
      <Results groups={groupNames} isHideTitle={true} isWideTable={true} />
    </div>
  );
};

export default Welcome;

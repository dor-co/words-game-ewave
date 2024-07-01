import React from "react";

const Results = ({ groups, isHideTitle, isWideTable }) => {
  const scores = localStorage.getItem("score")?.split(",").map(Number);

  return (
    <>
      {scores && (
        <div className="results-container">
          {!isHideTitle && <h2>תוצאות משחק</h2>}
          <table
            className={`results-table ${
              isWideTable ? "results-wide-table" : ""
            }`}
          >
            <thead>
              <tr>
                <th>קבוצה</th>
                <th>ניקוד</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={index}>
                  <td>{group}</td>
                  <td className="score-cell">{scores[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Results;

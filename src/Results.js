import React from 'react';

const Results = ({ groups }) => {
    const scores = sessionStorage.getItem('score').split(',').map(Number);
    console.log(scores);
    return (
        <div className="results-container">
            <h2>תוצאות משחק</h2>
            <table className="results-table">
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
    );
};

export default Results;

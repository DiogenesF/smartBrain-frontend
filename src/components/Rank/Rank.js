import React, { useState, useEffect } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState("");

  const generateEmoji = () => {
    fetch(
      `https://xf1ewws63m.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`
    )
      .then((resp) => resp.json())
      .then((data) => setEmoji(data.input))
      .catch((err) => console.log("Error"));
  };

  useEffect(() => {
    generateEmoji(entries);
  }, [entries]);

  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
      <div className="white f3">Rank badge: {emoji}</div>
    </div>
  );
};

export default Rank;

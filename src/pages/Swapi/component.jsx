import React from "react";
import People from "./People";

export default function App() {
  const [peopleId, setPeopleId] = React.useState(0);

  return (
    <div className="App">
      {[0, 1, 2, 3, 4, 5].map((num) => (
        <button
          onClick={() => {
            setPeopleId(num);
          }}
          style={{
            marginRight: "1rem",
            border: num === peopleId ? "2px solid green" : ""
          }}
        >
          {num}
        </button>
      ))}

      <People id={peopleId} />
    </div>
  );
}

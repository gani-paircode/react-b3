import React from "react";
import { People } from "./People";
import Button from '../../components/Button';

export const Swapi = () => {
  const [peopleId, setPeopleId] = React.useState(0);

  return (
    <div className="formContainer">
      
      {[0, 1, 2, 3, 4, 5].map((num) => (
        <Button
          onClick={() => {
            setPeopleId(num);
          }}
          key={num}
        >
          {num}
        </Button>
      ))}

      <People id={peopleId} />
    </div>
  );
}

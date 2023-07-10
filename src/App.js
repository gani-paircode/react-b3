import React, { useCallback, useRef, useState } from 'react';
import "./styles.css";

export default function App() {
  const [names, setNames] = useState(['raj']);
  const nameRef = useRef();
  const [randomNum, setRandomNum] = useState(0);
  const addNames = useCallback(() => {
    const newNames = [...names, nameRef.current.value];
    setNames(newNames);
    nameRef.current.value = '';
    nameRef.current.focus();
  }, [names]);
  

  const addNames2 = useCallback(() => {
    setNames((old) => {
      const value = nameRef.current.value;
      const newNames = [...old, value];
      return newNames;
    });
    // nameRef.current.value = '';
    nameRef.current.focus();
  }, []);
  
  return (
    <div className="App">
      <input id="name1" ref={nameRef} />
      <button onClick={addNames}>Add Btn 1</button>
      &nbsp;&nbsp;
      <button onClick={addNames2}>Add Btn 2</button>

      <br />
      <h3>{names.join(", ")}</h3>
      <h3 onClick={(e) => setRandomNum(Math.random())}>Random number : {randomNum}</h3>
    </div>
  );
}

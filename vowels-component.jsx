import * as React from "react";
import "./styles.css";

export default function App() {
  const [name, setName] = React.useState("");
  const [records, setRecords] = React.useState([]);
  const vowelsfreq = (name) => {
    const count = name.match(/[aeiou]/gi)?.length || 0;
    return count;
  };
  const vFreq = vowelsfreq(name);
  const newRecords = [...records];
  const highlightVowels = (nm) => {
    const vowels = /[aeiou]/gi;
    return nm.split("").map((char, index) => {
      if (char.match(vowels)) {
        return (
          <span key={index} style={{ color: "red" }}>
            {char}
          </span>
        );
      } else {
        return char;
      }
    });
  };
  const handleSubmit = () => {
    setName("");
    let matchFound = false;
    for (let i = 0; i < newRecords.length; i++) {
      if (vFreq === newRecords[i].vFreq) {
        newRecords[i].name.push(name);
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      newRecords.push({
        name: [name],
        vFreq
      });
    }

    console.log(newRecords);
    setRecords(newRecords);
  };

  return (
    <div className="App">
      <div>
        <h1>Vowels Activity</h1>
      </div>
      <div>
        <label>Names:</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          value={name}
          placeholder="Enter Your Names"
        />
        <button id="myBtn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Vowels Frequency</th>
              <th>Names</th>
            </tr>
          </thead>
          <tbody>
            {records.map(({ name, vFreq }, index) => {
              return (
                <tr key={index}>
                  <td>{vFreq}</td>
                  <td>
                    <ol>
                      {name.map((name) => {
                        return (
                          <li>
                            {highlightVowels(name)}({name.length})
                          </li>
                        );
                      })}
                    </ol>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

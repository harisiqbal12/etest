import "./styles.css";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState({
    left: ["HTML", "Javascript", "CSS", "Typescript"],
    right: ["React", "Angular", "Vue", "Svelte"]
  });

  const [selected, setSelected] = useState([]);

  const handleMoveAll = (type, change) => () => {
    setData((prev) => {
      const copy = { ...prev };

      copy[change] = prev[type];
      copy[type] = prev[change];

      return copy;
    });
  };

  const handleMoveSelected = (type, change) => () => {
    const copy = { ...data };

    if (selected.length === 0) return;

    const array = copy[type].filter((f) => !selected.includes(f));
    console.log(array);
    copy[type] = array;
    selected.forEach((el) => {
      copy[change].push(el);
    });

    setData(copy);
    setSelected([]);
    return copy;
  };

  const handleSelect = (value) => () => {
    const copy = [...selected];

    const isExisted = copy.find((el) => el === value);

    if (isExisted) {
      const computed = copy.filter((el) => el !== value);
      return computed;
    }

    copy.push(value);
    setSelected(copy);
  };

  return (
    <div>
      <div>
        <ul>
          {data.left.map((el, i) => (
            <div key={i} style={{ display: "flex" }}>
              <input onClick={handleSelect(el)} value={false} type="checkbox" />
              <li>{el}</li>
            </div>
          ))}
        </ul>
        <button onClick={handleMoveAll("left", "right")}>{">>"}</button>
        <button onClick={handleMoveSelected("left", "right")}>{">"}</button>

        <ul>
          {data.right.map((el, i) => (
            <div key={i} style={{ display: "flex" }}>
              <input onClick={handleSelect(el)} type="checkbox" />
              <li>{el}</li>
            </div>
          ))}
        </ul>
        <button onClick={handleMoveAll("right", "left")}>{"<<"}</button>
        <button onClick={handleMoveSelected("right", "left")}>{"<"}</button>
      </div>
    </div>
  );
}

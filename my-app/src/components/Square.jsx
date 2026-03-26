import { useState } from "react";

export default function Square() {
  const [value, setValue] = useState(null);

  return (
    <button
      className="square"
      onClick={() => setValue(value === "X" ? "O" : "X")}
    >
      {value || "CLICK"}
    </button>
  );
}
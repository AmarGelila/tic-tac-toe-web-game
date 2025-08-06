import { useContext } from "react";
import { MetaDataContext } from "../../meta-data-context";

export default function GameHeader({ currentPlayer }) {
  const { xname, oname } = useContext(MetaDataContext);
  return (
    <>
      <div className={`player ${currentPlayer === "x" ? "active" : ""}`}>
        <h1>X</h1>
        <span className="name">{xname}</span>
      </div>

      <div className={`player ${currentPlayer === "o" ? "active" : ""}`}>
        <h1>O</h1>
        <span className="name">{oname}</span>
      </div>
    </>
  );
}

import { useContext , useRef } from "react";
import { MetaDataContext } from "../../meta-data-context";

export default function GameHistory({
  currentPlayer,
  setCurrentPlayer,
  board,
  setBoard,
  history,
  setHistory,
}) {
  const { xname, oname } = useContext(MetaDataContext);
  const firstPlayer = useRef(currentPlayer);
  const secondPlayer = firstPlayer.current === "x" ? "o" : "x";

  function handleHistoryClick(e) {
    if (e.target.parentElement.classList.contains("move") === true) {
      const id = +e.target.parentElement.dataset.key;
      const prevBoard = board;

      for (let i = id + 1; i < history.length; i++) {
        prevBoard[history[i]] = "";
      }
      setBoard(prevBoard);
      setHistory((prev) => prev.slice(0, id + 1));
      setCurrentPlayer(() =>
        id % 2 === 0 ? secondPlayer : firstPlayer.current
      );
    }
  }

  function handleUndoClick() {
    if (history.length !== 0) {
      const prevBoard = board;
      const id = history.length - 1;
      prevBoard[history[id]] = "";
      setBoard(prevBoard);
      setHistory((prev) => prev.slice(0, id));
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    }
  }

  return (
    <section id="history">

      <button type="button" id="undo" onClick={handleUndoClick} disabled={history.length === 0}>
        Undo
      </button>

      <ul onClick={handleHistoryClick}>
        {history.map((move, i) => {
          return (
            <li className="move" key={i} data-key={i}>
              <button type="button">
                {i % 2 === 0
                  ? firstPlayer.current === "x"
                    ? xname
                    : oname
                  : secondPlayer === "x"
                  ? xname
                  : oname}{" Filled at cell "}
                {move + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
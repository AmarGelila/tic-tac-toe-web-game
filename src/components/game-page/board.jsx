export default function Board({ board, handleCellClick, winCells , winState , drawState }) {
  return (
    <ul
      className="boardGrid"
      onClick={winState === false ? handleCellClick : null}
    >
      {board.map((cell, i) => {
        return (
          <li
            className={`cell${
              winState === true && winCells.includes(i) === true ? " win-cell" : ""
            }`}
            key={i}
            data-key={i}
          >
            <button type="button" disabled={winState || drawState}>
              {cell}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

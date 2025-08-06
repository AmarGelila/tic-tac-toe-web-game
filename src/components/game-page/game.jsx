import { useCallback, useContext, useEffect, useRef, useState } from "react";
import GameHeader from "./game-header";
import Board from "./board";
import History from "./history";
import {
  randomStartPlayer,
  randomEmptyCell,
  checkWin as checkWinUtility,
} from "./utilities";
import { MetaDataContext } from "../../meta-data-context";

export default function GameBoard() {
  const {
    setCurrentPage,
    oname,
    setOname,
    xname,
    setXname,
    opponent,
    setOpponent,
  } = useContext(MetaDataContext);
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [history, setHistory] = useState([]);
  const winCells = useRef();
  const [currentPlayer, setCurrentPlayer] = useState(() => randomStartPlayer());
  const [winState, setWinState] = useState(false);
  let drawState = history.length === 9 && !winState;

  const checkWin = useCallback(() => checkWinUtility(board), [board]);

  function handleCellClick(e) {
    if (e.target.parentElement.classList.contains("cell") === true) {
      const id = +e.target.parentElement.dataset.key;
      setBoard((prev) => prev.map((c, i) => (i === id ? currentPlayer : c)));
      setHistory((prev) => [...prev, id]);
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    }
  }

  function AIPlay() {
    let id;
    while (true) {
      id = randomEmptyCell();
      if (board[id] === "") break;
    }
    setBoard((prev) => prev.map((c, i) => (i === id ? currentPlayer : c)));
    setHistory((prev) => [...prev, id]);
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
  }

  useEffect(() => {
    let AITurn =
      opponent === "ai" &&
      ((currentPlayer === "x" && xname === "AI") ||
        (currentPlayer === "o" && oname === "AI"));
    let timeId;
    if (AITurn && !winState) {
      timeId = setTimeout(() => AIPlay(), 2000);
    }
    return () => {
      clearTimeout(timeId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, winState]);

  useEffect(() => {
    winCells.current = checkWin();
    setWinState(() => winCells.current !== undefined);
    console.log("Here", winCells.current, winState);
  }, [checkWin, winState]);

  return (
    <>
      <header>
        {drawState === true ? <h1>NO WINNER</h1> : winState === false ? (
          <GameHeader currentPlayer={currentPlayer} />
        ) : (
          <WinHeader winCells={winCells} xname={xname} oname={oname} />
        )}
      </header>
      <main>
        <Board
          board={board}
          handleCellClick={handleCellClick}
          winCells={winCells.current}
          winState={winState}
          drawState={drawState}
        />
      </main>
      {winState === false && drawState === false ? (
        <History
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          board={board}
          setBoard={setBoard}
          history={history}
          setHistory={setHistory}
        />
      ) : (
        <section id="resetButtons">
          <button
            type="button"
            className="main-button"
            onClick={() => {
              setBoard(new Array(9).fill(""));
              setHistory([]);
              setCurrentPlayer(() => randomStartPlayer());
              winCells.current = undefined;
              setWinState(false);
            }}
          >
            New Game
          </button>
          <button
            type="button"
            className="main-button"
            onClick={() => {
              setCurrentPage("start");
              setOname("");
              setXname("");
              setOpponent("local");
            }}
          >
            Start Page
          </button>
        </section>
      )}
    </>
  );
}

function WinHeader({ winCells, xname, oname }) {
  return <h1>{winCells[0] === "x" ? xname : oname} Wins</h1>
}

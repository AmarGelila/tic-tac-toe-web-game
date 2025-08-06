/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { MetaDataContext } from "../../meta-data-context";

export function StartPage() {
  const {
    setCurrentPage,
    opponent,
    xname,
    setXname,
    handleXnameChange,
    oname,
    setOname,
    handleOnameChange,
  } = useContext(MetaDataContext);

  function handleStartClick() {
    if (xname === "") setXname("GuestX");
    if (oname === "") {
      if (opponent === "ai") setOname("AI");
      else setOname("GuestO");
    }
    setCurrentPage("game");
  }

  return (
    <main>
      <section className="choose-opponent">
        <OpponentRadio vs={"ai"} defaultChecked={false} />
        <OpponentRadio vs={"local"} defaultChecked={true} />
      </section>

      <section className="players-names">
        <PlayerNameInput
          XOrO={"x"}
          playerName={xname}
          handleNameChange={handleXnameChange}
          opponent={opponent}
        />
        <PlayerNameInput
          XOrO={"o"}
          playerName={oname}
          handleNameChange={handleOnameChange}
          opponent={opponent}
        />
      </section>

      <button type="button" className="main-button" onClick={handleStartClick}>
        Start Game
      </button>
    </main>
  );
}

function OpponentRadio({ vs, defaultChecked }) {
  const { setOpponent, setXname, setOname } = useContext(MetaDataContext);
  return (
    <div className="opponent">
      <input
        type="radio"
        name="opponent"
        id={vs}
        onClick={() => {
          setOpponent(vs);
          setOname("");
          setXname("");
        }}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={vs}>{vs.toUpperCase()}</label>
    </div>
  );
}

function PlayerNameInput({ XOrO, playerName, handleNameChange, opponent }) {
  const XOrOUpper = XOrO.toUpperCase();
  return (
    <div className={`side ${XOrO}`}>
      <h1>{XOrOUpper}</h1>
      <input
        placeholder={`${XOrOUpper} player name`}
        type="text"
        name={`${XOrOUpper}-name`}
        id={`${XOrO}-name`}
        value={playerName}
        onChange={handleNameChange}
        disabled={playerName === "AI" && opponent === "ai"}
      />
    </div>
  );
}

/*
    --- ai : first typing input 


    1.. AI || Local
    2..   X       O
         1st     2nd          'input player names'
    3.. Start Game Button
        - validiate inputs
        
*/

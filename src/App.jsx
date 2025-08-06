/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";
import { MetaDataContext } from "./meta-data-context";
import { StartPage } from "./components/start-page/index";
import GameBoard from "./components/game-page/game";


export default function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [opponent, setOpponent] = useState("local");
  const [xname, setXname] = useState("");
  const [oname, setOname] = useState("");
  
  function handleXnameChange(e) {
    setXname(e.target.value);
    if (opponent === "ai") {
      setOname("AI");
    }
  }

  function handleOnameChange(e) {
    setOname(e.target.value);
    if (opponent === "ai") {
      setXname("AI");
    }
  }

  const metaData = {
    currentPage,
    setCurrentPage,
    opponent,
    setOpponent,
    xname,
    setXname,
    handleXnameChange,
    oname,
    setOname,
    handleOnameChange
  }
  
  return ( 
    <MetaDataContext.Provider value={metaData}>
      { currentPage === "start" ? <StartPage /> : currentPage === "game" ? <GameBoard /> : ""}
    </MetaDataContext.Provider>
  );
}

/*
    Three Pages :- 
        1- Initial Page :-

        2- Game Page :-
            - 'X' || 'O' turn  
            - 
*/

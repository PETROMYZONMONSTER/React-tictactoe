import React, { useState } from "react";
import "./App.css";

export default function TicTacToe() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(9).fill("·"));
  const [winner, setWinner] = useState();
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = (arr) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
            arr[pattern[0]] === "·" ||
            arr[pattern[1]] === "·" ||
            arr[pattern[2]] === "·"
        ) {
        } else if (
            arr[pattern[0]] === arr[pattern[1]] &&
            arr[pattern[1]] === arr[pattern[2]]
        ) {
          setWinner(arr[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (winner || cells[num] !== "·") return;

    let arr = [...cells];
    if (turn === "X") {
      arr[num] = "X";
      setTurn("O");
    } else {
      arr[num] = "O";
      setTurn("X");
    }
    checkWinner(arr);
    setCells(arr);
    if (!arr.includes("·") && !winner) {
      setIsDraw(true);
    }
  };

  const Cell = ({ num }) => {
    const cellValue = cells[num];
    const cellClassName = cellValue ? `cell cell-${cellValue}` : "cell";

    return (
        <td className={cellClassName} onClick={() => handleClick(num)}>
          {cellValue}
        </td>
    );
  };

  const handleReset = () => {
    setWinner(null);
    setIsDraw(false);
    setTurn("X");
    setCells(Array(9).fill("·"));
  };

  document.body.classList.add("light-theme");

  const toggleTheme = () => {
    let element = document.body;
    element.classList.toggle("dark-theme")
  }

  return (
      <div className="general_container">
        <div className="game_container">
          <div className="division_container">
            <div className="player_container_1">
              <h3>Player 1</h3>
            </div>
            <div className={`winner ${winner || isDraw ? "show" : null}`}>
              {winner === "X" ? `${winner} wins!` : isDraw ? "A draw!" : null}
            </div>
          </div>
          <div className="division_container">
            <h1>React TicTacToe </h1>
            <table>
              <tbody>
              <tr>
                <Cell num={0}/>
                <Cell num={1}/>
                <Cell num={2}/>
              </tr>
              <tr>
                <Cell num={3}/>
                <Cell num={4}/>
                <Cell num={5}/>
              </tr>
              <tr>
                <Cell num={6}/>
                <Cell num={7}/>
                <Cell num={8}/>
              </tr>
              </tbody>
            </table>
            <button className="basic_button" onClick={toggleTheme}>
              Change theme
            </button>
          </div>
          <div className="division_container">
            <div className="player_container_2">
              <h3>Player 2</h3>
            </div>
            <div className={`winner ${winner || isDraw ? "show" : null}`}>
              {winner === "O" ? `${winner} wins!` : isDraw ? "A draw!" : null}
            </div>
          </div>
        </div>
          <button className="basic_button" onClick={handleReset}>
            Reset game
          </button>
        </div>
        );
        }


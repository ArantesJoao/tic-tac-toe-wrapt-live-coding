"use client"

import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  function renderSquare(index) {
    return (
      <button
        className={`w-20 h-20 text-xl ${index % 3 !== 2 ? "border-r" : ""} ${Math.floor(index / 3) !== 2 ? "border-b" : ""} border-neutral-900`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isXNext ? 'X' : 'O');
  }

  return (
    <div className="h-screen text-center justify-center items-center">
      <div className="m-20">{status}</div>
      <div className="flex justify-center">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex justify-center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex justify-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="m-10 p-2 hover:bg-blue-600 bg-blue-500 transition duration-400 rounded text-white" onClick={reset}>Reset</button>
    </div>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

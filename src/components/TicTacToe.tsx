import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Player = 'X' | 'O' | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const calculateWinner = (squares: Player[]): Player | 'draw' | null => {
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

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const getStatusText = () => {
    if (winner === 'draw') return 'Ничья!';
    if (winner) return `Победил ${winner}!`;
    return `Ход игрока ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <h1 className="text-5xl font-bold mb-8 tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
        TIC-TAC-TOE
      </h1>
      
      <div className="mb-8 text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
        {getStatusText()}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-[#E5E7EB] hover:bg-[#D1D5DB] transition-colors duration-200 flex items-center justify-center text-5xl font-bold border-2 border-black"
            style={{ fontFamily: 'Arial, sans-serif' }}
            disabled={!!winner || !!cell}
          >
            {cell}
          </button>
        ))}
      </div>

      <Button
        onClick={resetGame}
        size="lg"
        className="bg-black hover:bg-[#333333] text-white font-bold px-8 py-6 text-lg border-2 border-black"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        PLAY NOW
      </Button>
    </div>
  );
};

export default TicTacToe;

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Cell {
  isRevealed: boolean;
  isDiamond: boolean;
  isBomb: boolean;
}

const DiamondMineGame = ({ onClose }: { onClose: () => void }) => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [diamondsFound, setDiamondsFound] = useState(0);
  const totalDiamonds = 8;
  const totalBombs = 6;

  const initializeGrid = () => {
    const newGrid: Cell[][] = Array(6).fill(null).map(() =>
      Array(6).fill(null).map(() => ({
        isRevealed: false,
        isDiamond: false,
        isBomb: false
      }))
    );

    // Place diamonds randomly
    let diamondsPlaced = 0;
    while (diamondsPlaced < totalDiamonds) {
      const row = Math.floor(Math.random() * 6);
      const col = Math.floor(Math.random() * 6);
      if (!newGrid[row][col].isDiamond && !newGrid[row][col].isBomb) {
        newGrid[row][col].isDiamond = true;
        diamondsPlaced++;
      }
    }

    // Place bombs randomly
    let bombsPlaced = 0;
    while (bombsPlaced < totalBombs) {
      const row = Math.floor(Math.random() * 6);
      const col = Math.floor(Math.random() * 6);
      if (!newGrid[row][col].isDiamond && !newGrid[row][col].isBomb) {
        newGrid[row][col].isBomb = true;
        bombsPlaced++;
      }
    }

    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setDiamondsFound(0);
  };

  const revealCell = (row: number, col: number) => {
    if (gameOver || gameWon || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].isBomb) {
      setGameOver(true);
      // Reveal all bombs
      newGrid.forEach(r => r.forEach(cell => {
        if (cell.isBomb) cell.isRevealed = true;
      }));
    } else if (newGrid[row][col].isDiamond) {
      const newDiamondsFound = diamondsFound + 1;
      const points = 100 + (newDiamondsFound * 50); // Increasing value
      setScore(prev => prev + points);
      setDiamondsFound(newDiamondsFound);
      
      if (newDiamondsFound === totalDiamonds) {
        setGameWon(true);
        setScore(prev => prev + 1000); // Bonus for winning
      }
    } else {
      // Empty cell, small points
      setScore(prev => prev + 10);
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const getCellContent = (cell: Cell) => {
    if (!cell.isRevealed) return '?';
    if (cell.isDiamond) return '💎';
    if (cell.isBomb) return '💣';
    return '⚫';
  };

  const getCellStyle = (cell: Cell) => {
    if (!cell.isRevealed) return 'bg-muted hover:bg-muted/80 cursor-pointer';
    if (cell.isDiamond) return 'bg-accent text-accent-foreground';
    if (cell.isBomb) return 'bg-destructive text-destructive-foreground';
    return 'bg-surface-dark text-muted-foreground';
  };

  return (
    <Card className="cyberpunk-card p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-cyber font-bold neon-text mb-2">DIAMOND_MINE</h2>
        <div className="text-sm font-mono text-muted-foreground">
          Score: {score} | Diamonds: {diamondsFound}/{totalDiamonds}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-6 gap-1 mb-6 p-4 bg-surface-darker rounded-lg">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 text-sm font-bold rounded transition-all ${getCellStyle(cell)} ${
                !cell.isRevealed && !gameOver && !gameWon ? 'hover:scale-105' : ''
              }`}
              onClick={() => revealCell(rowIndex, colIndex)}
              disabled={gameOver || gameWon || cell.isRevealed}
            >
              {getCellContent(cell)}
            </button>
          ))
        )}
      </div>

      {/* Game Status */}
      {gameOver && (
        <div className="text-center mb-4 p-3 bg-destructive/20 rounded border border-destructive">
          <div className="text-destructive font-cyber font-bold">💥 GAME OVER!</div>
          <div className="text-sm font-mono">You hit a mine!</div>
        </div>
      )}

      {gameWon && (
        <div className="text-center mb-4 p-3 bg-accent/20 rounded border border-accent">
          <div className="text-accent font-cyber font-bold">🎉 VICTORY!</div>
          <div className="text-sm font-mono">All diamonds found! Bonus: 1000 pts</div>
        </div>
      )}

      {/* Info Panel */}
      <div className="bg-surface-dark rounded p-3 mb-4 text-xs font-mono">
        <div className="text-center text-muted-foreground mb-2">MISSION BRIEFING</div>
        <div className="space-y-1">
          <div>💎 Diamonds: +100 pts (+50 bonus each)</div>
          <div>⚫ Safe cells: +10 pts</div>
          <div>💣 Mines: Game Over</div>
          <div>🏆 All diamonds: +1000 bonus</div>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={initializeGrid} className="w-full cyber-button">
          NEW GAME
        </Button>
        
        <Button variant="outline" onClick={onClose} className="w-full">
          EXIT MINE
        </Button>
      </div>
    </Card>
  );
};

export default DiamondMineGame;
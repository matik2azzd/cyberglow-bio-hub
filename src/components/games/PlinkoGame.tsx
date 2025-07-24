import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PlinkoGame = ({ onClose }: { onClose: () => void }) => {
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState<number>(5);
  const [isDropping, setIsDropping] = useState(false);

  const dropBall = () => {
    if (balls <= 0 || isDropping) return;
    
    setIsDropping(true);
    setBalls(prev => prev - 1);
    
    // Simulate ball drop with random scoring
    setTimeout(() => {
      const multipliers = [10, 50, 100, 500, 100, 50, 10];
      const randomSlot = Math.floor(Math.random() * multipliers.length);
      const points = multipliers[randomSlot];
      setScore(prev => prev + points);
      setIsDropping(false);
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setBalls(5);
    setIsDropping(false);
  };

  return (
    <Card className="cyberpunk-card p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-cyber font-bold neon-text mb-2">PLINKO.exe</h2>
        <div className="text-sm font-mono text-muted-foreground">
          Balls: {balls} | Score: {score}
        </div>
      </div>

      {/* Plinko Board Visualization */}
      <div className="bg-surface-darker rounded-lg p-4 mb-6 h-64 relative overflow-hidden">
        <div className="text-center text-muted-foreground font-mono text-xs mb-4">
          NEURAL PHYSICS ENGINE
        </div>
        
        {/* Pegs representation */}
        <div className="grid grid-cols-7 gap-2 h-32">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-primary rounded-full opacity-30" />
          ))}
        </div>
        
        {/* Score multipliers at bottom */}
        <div className="grid grid-cols-7 gap-1 mt-4">
          {[10, 50, 100, 500, 100, 50, 10].map((multiplier, i) => (
            <div
              key={i}
              className={`text-center text-xs font-mono py-1 rounded ${
                multiplier === 500 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {multiplier}x
            </div>
          ))}
        </div>
        
        {/* Dropping ball animation */}
        {isDropping && (
          <div className="absolute top-4 left-1/2 w-3 h-3 bg-secondary rounded-full animate-bounce" />
        )}
      </div>

      <div className="space-y-3">
        <Button
          onClick={dropBall}
          disabled={balls <= 0 || isDropping}
          className="w-full cyber-button"
        >
          {isDropping ? 'DROPPING...' : `DROP BALL (${balls} left)`}
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetGame} className="flex-1">
            RESET
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            EXIT
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PlinkoGame;
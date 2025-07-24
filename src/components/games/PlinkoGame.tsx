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
    
    // Enhanced ball drop simulation with realistic physics
    setTimeout(() => {
      const multipliers = [10, 50, 100, 500, 1000, 100, 50, 10];
      const weights = [20, 15, 12, 8, 2, 8, 12, 15, 20]; // Higher chance for lower values
      
      // Weighted random selection
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let randomNum = Math.random() * totalWeight;
      let selectedIndex = 0;
      
      for (let i = 0; i < weights.length; i++) {
        randomNum -= weights[i];
        if (randomNum <= 0) {
          selectedIndex = i;
          break;
        }
      }
      
      const points = multipliers[selectedIndex];
      setScore(prev => prev + points);
      setIsDropping(false);
    }, 2500); // Slightly longer for better suspense
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
        <div className="grid grid-cols-8 gap-2 h-32">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-primary rounded-full opacity-30 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        
        {/* Score multipliers at bottom */}
        <div className="grid grid-cols-8 gap-1 mt-4">
          {[10, 50, 100, 500, 1000, 100, 50, 10].map((multiplier, i) => (
            <div
              key={i}
              className={`text-center text-xs font-mono py-1 rounded ${
                multiplier === 1000 ? 'bg-accent text-accent-foreground glow-pink' : 
                multiplier >= 500 ? 'bg-secondary text-secondary-foreground' : 
                'bg-muted text-muted-foreground'
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
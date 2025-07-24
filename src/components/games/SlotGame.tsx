import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const symbols = ['🔥', '⚡', '💎', '🌟', '👑', '🎯', '💜'];

const SlotGame = ({ onClose }: { onClose: () => void }) => {
  const [reels, setReels] = useState(['🔥', '⚡', '💎']);
  const [score, setScore] = useState(1000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);

  const spin = () => {
    if (score < 50 || isSpinning) return;
    
    setIsSpinning(true);
    setScore(prev => prev - 50); // Cost to spin
    setLastWin(0);
    
    // Animate reels
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);
    
    // Stop spinning after 2 seconds
    setTimeout(() => {
      clearInterval(spinInterval);
      
      // Final result
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(finalReels);
      
      // Check for wins
      let winAmount = 0;
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        // Three of a kind
        winAmount = 500;
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
        // Two of a kind
        winAmount = 150;
      }
      
      if (winAmount > 0) {
        setScore(prev => prev + winAmount);
        setLastWin(winAmount);
      }
      
      setIsSpinning(false);
    }, 2000);
  };

  const resetGame = () => {
    setScore(1000);
    setLastWin(0);
    setReels(['🔥', '⚡', '💎']);
  };

  return (
    <Card className="cyberpunk-card p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-cyber font-bold neon-text mb-2">NEON_SLOTS</h2>
        <div className="text-sm font-mono text-muted-foreground">
          Credits: {score} | Last Win: {lastWin}
        </div>
      </div>

      {/* Slot Machine */}
      <div className="bg-surface-darker rounded-lg p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {reels.map((symbol, i) => (
            <div
              key={i}
              className={`text-6xl text-center py-4 rounded neon-border ${
                isSpinning ? 'animate-pulse' : ''
              }`}
            >
              {symbol}
            </div>
          ))}
        </div>
        
        {lastWin > 0 && (
          <div className="text-center text-accent font-cyber font-bold animate-pulse">
            🎉 WIN: {lastWin} CREDITS! 🎉
          </div>
        )}
      </div>

      {/* Paytable */}
      <div className="bg-surface-dark rounded p-3 mb-4 text-xs font-mono">
        <div className="text-center text-muted-foreground mb-2">PAYTABLE</div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>3 Match:</span>
            <span className="text-accent">500 Credits</span>
          </div>
          <div className="flex justify-between">
            <span>2 Match:</span>
            <span className="text-secondary">150 Credits</span>
          </div>
          <div className="flex justify-between">
            <span>Spin Cost:</span>
            <span className="text-muted-foreground">50 Credits</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={spin}
          disabled={score < 50 || isSpinning}
          className="w-full cyber-button"
        >
          {isSpinning ? 'SPINNING...' : `SPIN (50 Credits)`}
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

export default SlotGame;
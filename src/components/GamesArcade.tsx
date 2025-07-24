import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Zap, Diamond, Coins } from 'lucide-react';
import PlinkoGame from './games/PlinkoGame';
import SlotGame from './games/SlotGame';
import DiamondMineGame from './games/DiamondMineGame';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'available' | 'coming-soon';
}

const GamesArcade = () => {
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games: Game[] = [
    {
      id: 'plinko',
      name: 'PLINKO.exe',
      description: 'Drop the ball through neural pegs for cyber rewards',
      icon: Zap,
      status: 'available'
    },
    {
      id: 'slots',
      name: 'NEON_SLOTS',
      description: 'Spin the quantum reels in the digital casino',
      icon: Coins,
      status: 'available'
    },
    {
      id: 'diamond',
      name: 'DIAMOND_MINE',
      description: 'Navigate the minefield to collect precious data gems',
      icon: Diamond,
      status: 'available'
    }
  ];

  const launchGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <>
      {/* Floating Arcade Button */}
      <Button
        onClick={() => setIsArcadeOpen(!isArcadeOpen)}
        className="fixed bottom-6 right-6 cyber-button w-16 h-16 rounded-full p-0 z-50 animate-float"
        size="lg"
      >
        <Gamepad2 className="w-6 h-6" />
      </Button>

      {/* Arcade Panel */}
      {isArcadeOpen && !selectedGame && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <Card className="cyberpunk-card w-full max-w-4xl p-6 animate-entrance">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-cyber font-bold neon-text">
                🎮 CYBER_ARCADE
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsArcadeOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="game-card group relative overflow-hidden cursor-pointer"
                  onClick={() => game.status === 'available' && launchGame(game.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <game.icon className="w-10 h-10 text-primary group-hover:text-primary-glow transition-colors" />
                    <h3 className="font-cyber font-semibold text-xl">
                      {game.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-mono mb-6 leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                      game.status === 'available' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {game.status === 'available' ? '🟢 ONLINE' : '🟡 OFFLINE'}
                    </span>
                    
                    {game.status === 'available' && (
                      <Button size="sm" variant="cyber" className="text-xs px-4">
                        EXECUTE
                      </Button>
                    )}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-muted-foreground border-t border-border pt-4">
              💾 All games run locally with quantum encryption • No data transmitted to neural networks
            </div>
          </Card>
        </div>
      )}

      {/* Individual Game Windows */}
      {selectedGame && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {selectedGame === 'plinko' && <PlinkoGame onClose={closeGame} />}
          {selectedGame === 'slots' && <SlotGame onClose={closeGame} />}
          {selectedGame === 'diamond' && <DiamondMineGame onClose={closeGame} />}
        </div>
      )}
    </>
  );
};

export default GamesArcade;
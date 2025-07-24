import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Zap, Diamond, Coins } from 'lucide-react';

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
      description: 'Drop the ball and watch physics do the magic',
      icon: Zap,
      status: 'available'
    },
    {
      id: 'slots',
      name: 'NEON_SLOTS',
      description: 'Spin the cyber reels for digital glory',
      icon: Coins,
      status: 'available'
    },
    {
      id: 'diamond',
      name: 'DIAMOND_MINE',
      description: 'Click to find diamonds, avoid the bombs',
      icon: Diamond,
      status: 'available'
    }
  ];

  const launchGame = (gameId: string) => {
    setSelectedGame(gameId);
    // In a real implementation, this would launch the game
    console.log(`Launching game: ${gameId}`);
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
      {isArcadeOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <Card className="cyberpunk-card w-full max-w-2xl p-6 animate-entrance">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-cyber font-bold neon-text">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="game-card relative overflow-hidden"
                  onClick={() => game.status === 'available' && launchGame(game.id)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <game.icon className="w-8 h-8 text-primary" />
                    <h3 className="font-cyber font-semibold text-lg">
                      {game.name}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-mono mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      game.status === 'available' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {game.status === 'available' ? 'READY' : 'COMING SOON'}
                    </span>
                    
                    {game.status === 'available' && (
                      <Button size="sm" variant="outline" className="text-xs">
                        LAUNCH
                      </Button>
                    )}
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* Game Demo Area */}
            {selectedGame && (
              <div className="border-t border-border pt-6">
                <div className="bg-surface-darker rounded-lg p-6 text-center">
                  <h3 className="text-lg font-cyber mb-4 text-primary">
                    GAME_LOADING...
                  </h3>
                  <div className="text-sm font-mono text-muted-foreground mb-4">
                    Selected: {games.find(g => g.id === selectedGame)?.name}
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-4">
                    Mini-games will be fully implemented in the next update
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default GamesArcade;
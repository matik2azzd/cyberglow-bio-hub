import { useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import VisitorCounter from '@/components/VisitorCounter';
import GamesArcade from '@/components/GamesArcade';
import CursorTrail from '@/components/CursorTrail';
import BackgroundVideo from '@/components/BackgroundVideo';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden custom-scrollbar">
      {/* Background Video */}
      <BackgroundVideo />
      
      {/* Cursor Trail Effect */}
      <CursorTrail />
      
      {/* Music Player */}
      <MusicPlayer />
      
      {/* Watermark */}
      <div className="fixed top-6 left-6 z-50">
        <h1 className="text-2xl font-cyber font-bold neon-text animate-pulse-glow">
          BlackCode.WTF
        </h1>
        <div className="text-xs font-mono text-muted-foreground mt-1">
          v2.0.cyber_edition
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center p-6">
          <div 
            className="parallax-element"
            style={{
              transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`
            }}
          >
            <ProfileCard />
          </div>
        </section>

        {/* Stats Section */}
        <section className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Visitor Counter */}
              <div 
                className="parallax-element animate-slide-up"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
                  animationDelay: '0.2s'
                }}
              >
                <VisitorCounter />
              </div>

              {/* System Status */}
              <div 
                className="parallax-element animate-slide-up cyberpunk-card p-4"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.03}px, ${(mousePosition.y - 50) * 0.03}px)`,
                  animationDelay: '0.4s'
                }}
              >
                <h3 className="font-cyber text-lg text-secondary mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  SYSTEM_STATUS
                </h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Neural Link:</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Firewall:</span>
                    <span className="text-green-400">SECURE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-primary">24/7</span>
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <div 
                className="parallax-element animate-slide-up cyberpunk-card p-4"
                style={{
                  transform: `translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`,
                  animationDelay: '0.6s'
                }}
              >
                <h3 className="font-cyber text-lg text-accent mb-3">
                  QUICK_ACCESS
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 rounded bg-surface-dark hover:bg-surface-darker border border-border transition-colors text-sm font-mono">
                    📁 Projects.zip
                  </button>
                  <button className="w-full text-left p-2 rounded bg-surface-dark hover:bg-surface-darker border border-border transition-colors text-sm font-mono">
                    💾 Download_Resume.exe
                  </button>
                  <button className="w-full text-left p-2 rounded bg-surface-dark hover:bg-surface-darker border border-border transition-colors text-sm font-mono">
                    🌐 Contact.link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Footer */}
        <footer className="p-6 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-darker rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-green-400">blackcode@cybernet:~$</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-primary">echo</span> "Welcome to my digital realm. Navigate through the neon-lit corridors of my mind."
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Last login: {new Date().toLocaleString()} from neural.network.256.1
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Games Arcade */}
      <GamesArcade />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default Index;

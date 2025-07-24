import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  src?: string;
  autoPlay?: boolean;
}

const MusicPlayer = ({ 
  src = "/music.mp3", 
  autoPlay = true 
}: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasError, setHasError] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setHasError(false);
      if (autoPlay) {
        // Try to autoplay with user interaction fallback
        audio.play().catch(() => {
          console.log('Autoplay prevented, user interaction required');
        });
      }
    };

    const handleError = () => {
      setHasError(true);
      console.log('Music file failed to load');
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [autoPlay, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  if (hasError) {
    return null; // Hide player if music fails to load
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={src} type="audio/mp3" />
      </audio>

      {/* Floating Music Player */}
      <Card className={`fixed top-6 right-6 z-40 cyberpunk-card transition-all duration-300 ${
        isMinimized ? 'w-14 h-14 p-0' : 'p-4 w-64'
      }`}>
        {isMinimized ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-full neon-border"
            onClick={() => setIsMinimized(false)}
          >
            <Volume2 className="w-5 h-5 text-primary animate-pulse" />
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-cyber text-primary">
                NEURAL_AUDIO
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                —
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlay}
                className="w-8 h-8 p-0"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="w-8 h-8 p-0"
              >
                {isMuted ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </Button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`
                }}
              />
            </div>

            {isPlaying && (
              <div className="text-xs font-mono text-muted-foreground text-center">
                🎵 Now Playing: Cyberpunk Ambient
              </div>
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default MusicPlayer;
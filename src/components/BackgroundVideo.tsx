import { useEffect, useRef, useState } from 'react';

interface BackgroundVideoProps {
  src?: string;
  fallbackColor?: string;
}

const BackgroundVideo = ({ 
  src = "/background.mp4", 
  fallbackColor = "var(--gradient-dark)" 
}: BackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
      console.log('Background video failed to load, using fallback');
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Try to load and play the video
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [src]);

  return (
    <>
      {/* Video Background */}
      {!hasError && (
        <div className="video-overlay">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ filter: 'brightness(0.4) contrast(1.3) saturate(1.2)' }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Fallback Gradient Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{ 
          background: fallbackColor,
          opacity: hasError || !isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />

      {/* Additional overlay for better text contrast */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-background/20 via-transparent to-primary/10" />
    </>
  );
};

export default BackgroundVideo;
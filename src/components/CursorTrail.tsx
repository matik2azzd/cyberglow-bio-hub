import { useEffect, useRef } from 'react';

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const trailRef = useRef<TrailDot[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.clientX - 4}px`;
      trail.style.top = `${e.clientY - 4}px`;
      
      document.body.appendChild(trail);
      
      // Remove the trail dot after animation
      setTimeout(() => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, 500);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === 'function' && target.matches('button, a, [role="button"], .interactive')) {
        target.style.transform = 'scale(1.05)';
        target.style.transition = 'transform 0.2s ease';
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && typeof target.matches === 'function' && target.matches('button, a, [role="button"], .interactive')) {
        target.style.transform = 'scale(1)';
      }
    };

    // Throttle mouse move events for performance
    let isThrottled = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!isThrottled) {
        handleMouseMove(e);
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, 16); // ~60fps
      }
    };

    document.addEventListener('mousemove', throttledMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default CursorTrail;
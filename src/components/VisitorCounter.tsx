import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Eye, Users } from 'lucide-react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize visitor tracking
    const initializeVisitorCount = () => {
      const storageKey = 'blackcode-visitors';
      const todayKey = 'blackcode-today';
      const today = new Date().toDateString();
      
      // Get existing data
      const existingData = localStorage.getItem(storageKey);
      const todayData = localStorage.getItem(todayKey);
      
      let totalVisitors = 0;
      let dailyVisitors = 0;
      
      if (existingData) {
        totalVisitors = parseInt(existingData, 10) || 0;
      }
      
      // Check if today's data exists and is for today
      if (todayData) {
        const todayInfo = JSON.parse(todayData);
        if (todayInfo.date === today) {
          dailyVisitors = todayInfo.count || 0;
        }
      }
      
      // Increment counts for new visit
      totalVisitors += 1;
      dailyVisitors += 1;
      
      // Store updated counts
      localStorage.setItem(storageKey, totalVisitors.toString());
      localStorage.setItem(todayKey, JSON.stringify({
        date: today,
        count: dailyVisitors
      }));
      
      // Animate the counter
      setIsAnimating(true);
      animateCounter(0, totalVisitors, setVisitorCount);
      animateCounter(0, dailyVisitors, setTodayCount);
      
      setTimeout(() => setIsAnimating(false), 2000);
    };

    initializeVisitorCount();
  }, []);

  const animateCounter = (
    start: number, 
    end: number, 
    setter: (value: number) => void
  ) => {
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setter(end);
        clearInterval(timer);
      } else {
        setter(Math.floor(current));
      }
    }, 16);
  };

  return (
    <Card className="cyberpunk-card p-4 animate-slide-up">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-cyber text-primary uppercase tracking-wider">
              Neural Traffic
            </span>
          </div>
          
          <div className="space-y-3">
            {/* Total Visitors */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                Total Visitors:
              </span>
              <span className={`visitor-counter ${isAnimating ? 'animate-pulse-glow' : ''}`}>
                {visitorCount.toLocaleString()}
              </span>
            </div>
            
            {/* Today's Visitors */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">
                Today:
              </span>
              <span className={`text-lg font-bold text-secondary font-cyber tabular-nums ${isAnimating ? 'animate-pulse-glow' : ''}`}>
                {todayCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <Eye className="w-8 h-8 text-secondary glow-cyan animate-float" />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            Tracking Active
          </span>
        </div>
      </div>
    </Card>
  );
};

export default VisitorCounter;
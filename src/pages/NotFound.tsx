import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-surface-dark to-surface-darker" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-destructive rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Card className="cyberpunk-card max-w-md mx-4 p-8 text-center animate-entrance relative z-10">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4 animate-pulse" />
          <h1 className="text-6xl font-cyber font-bold neon-text mb-2">404</h1>
          <div className="text-destructive font-mono text-sm mb-4">
            ERROR: NEURAL_PATHWAY_NOT_FOUND
          </div>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground font-mono text-sm mb-2">
            The requested data stream has been corrupted or moved to another sector of the cybernet.
          </p>
          <div className="text-xs text-muted-foreground font-mono bg-surface-darker p-2 rounded mt-4">
            Path: <span className="text-destructive">{location.pathname}</span>
          </div>
        </div>

        <Button 
          variant="cyber" 
          className="w-full"
          onClick={() => window.location.href = '/'}
        >
          <Home className="w-4 h-4 mr-2" />
          Return to Neural Hub
        </Button>
        
        <div className="mt-4 text-xs text-muted-foreground font-mono">
          Initiating auto-redirect in T-minus 10 seconds...
        </div>
      </Card>
    </div>
  );
};

export default NotFound;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Twitter, Music, Globe, MessageCircle } from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<any>;
  url: string;
  label: string;
}

interface ProfileData {
  username: string;
  tagline: string;
  status: 'online' | 'idle' | 'dnd';
  avatar: string;
  aboutMe: string;
  socialLinks: SocialLink[];
}

const ProfileCard = () => {
  // 🔧 CUSTOMIZE YOUR PROFILE HERE 🔧
  const [profile, setProfile] = useState<ProfileData>({
    username: "BlackCode",        // ← Change your username here
    tagline: "Neural Architect", // ← Change your tagline here  
    status: 'online',
    avatar: "/placeholder.svg",   // ← Upload your photo to /public/ and change path here
    aboutMe: "Welcome to my digital realm. I craft code in the shadows of the cybernet, building the future one line at a time. Specializing in neural networks, quantum algorithms, and blockchain architectures.", // ← Change your bio here
    socialLinks: [
      { icon: Github, url: "https://github.com/yourusername", label: "GitHub" },     // ← Add your links
      { icon: Twitter, url: "https://twitter.com/yourusername", label: "Twitter" },  // ← Add your links
      { icon: MessageCircle, url: "https://discord.gg/yourserver", label: "Discord" }, // ← Add your links
      { icon: Globe, url: "https://yourwebsite.com", label: "Website" }              // ← Add your links
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'status-online';
      case 'idle': return 'status-idle';
      case 'dnd': return 'status-dnd';
      default: return 'status-online';
    }
  };

  return (
    <Card className="cyberpunk-card max-w-md mx-auto p-6 animate-entrance">
      {/* Header with Avatar and Status */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="w-20 h-20 rounded-full border-2 border-primary neon-border"
          />
          <div className={`absolute -bottom-1 -right-1 status-indicator ${getStatusColor(profile.status)}`} />
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-cyber font-bold neon-text mb-1">
            {profile.username}
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-6">
        <h2 className="text-lg font-cyber font-semibold text-secondary mb-3">
          ABOUT_ME.exe
        </h2>
        <p className="text-sm text-foreground leading-relaxed font-mono">
          {profile.aboutMe}
        </p>
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h3 className="text-sm font-cyber font-semibold text-accent mb-3 uppercase tracking-wider">
          Neural_Links
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {profile.socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="cyber-button h-auto py-3 flex items-center gap-2 justify-start"
              onClick={() => window.open(link.url, '_blank')}
            >
              <link.icon className="w-4 h-4" />
              <span className="font-mono text-xs">{link.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Status Controls */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Status
          </span>
          <select
            value={profile.status}
            onChange={(e) => setProfile(prev => ({ ...prev, status: e.target.value as any }))}
            className="bg-surface-dark border border-border rounded px-2 py-1 text-xs font-mono text-foreground"
          >
            <option value="online">🟢 Online</option>
            <option value="idle">🟡 Idle</option>
            <option value="dnd">🔴 Do Not Disturb</option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
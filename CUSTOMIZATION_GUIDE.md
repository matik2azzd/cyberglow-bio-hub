# 🔧 BlackCode.WTF Customization Guide

## 📸 How to Change Your Profile Photo

1. **Upload your photo** to the `public` folder in your project
2. **Name it something like** `avatar.jpg` or `profile.png`
3. **Edit** `src/components/ProfileCard.tsx` line 24:
   ```tsx
   avatar: "/avatar.jpg",  // ← Change this to your photo filename
   ```

## ✏️ How to Customize Profile Information

**Edit `src/components/ProfileCard.tsx` lines 21-34:**

```tsx
const [profile, setProfile] = useState<ProfileData>({
  username: "BlackCode",                    // ← Change your display name
  tagline: "Neural Architect",             // ← Change your subtitle
  status: 'online',                        // ← online, idle, or dnd
  avatar: "/your-photo.jpg",               // ← Your photo path
  aboutMe: "Your custom bio here...",      // ← Your personal description
  socialLinks: [
    { icon: Github, url: "https://github.com/yourusername", label: "GitHub" },
    { icon: Twitter, url: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: MessageCircle, url: "https://discord.gg/yourserver", label: "Discord" },
    { icon: Globe, url: "https://yourwebsite.com", label: "Website" }
  ]
});
```

## 🎥 Background Video Setup

1. **Upload `background.mp4`** to the `public` folder
2. **The video will automatically load and loop**
3. **For custom filename**, edit `src/components/BackgroundVideo.tsx` line 6:
   ```tsx
   src = "/your-video.mp4"
   ```

## 🎵 Music Setup

1. **Upload `music.mp3`** to the `public` folder  
2. **Auto-detects and plays with controls**
3. **For custom filename**, edit `src/components/MusicPlayer.tsx` line 8:
   ```tsx
   src = "/your-music.mp3"
   ```

## 🏷️ Change Watermark Text

**Edit `src/pages/Index.tsx` lines 38-39:**
```tsx
BlackCode.WTF          // ← Change this to your text
v2.0.cyber_edition     // ← Change this to your version
```

## 🎮 Games Are Now Fixed!

- **Plinko**: Enhanced physics with weighted scoring (1000x jackpot!)
- **Slots**: Fully functional with credits system
- **Diamond Mine**: Complete minesweeper-style gameplay

## ✅ Fixes Applied:

✅ **Cursor trail error** - Fixed the matches function issue
✅ **Watermark unblurred** - Crystal clear with neon glow
✅ **Profile customization** - Easy editing guide provided
✅ **Plinko enhanced** - Better physics and 1000x jackpot
✅ **Visual improvements** - Sharper text and effects
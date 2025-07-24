import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk Theme Colors
				neon: {
					purple: 'hsl(var(--neon-purple))',
					cyan: 'hsl(var(--neon-cyan))',
					pink: 'hsl(var(--neon-pink))'
				},
				surface: {
					dark: 'hsl(var(--dark-surface))',
					darker: 'hsl(var(--darker-surface))'
				}
			},
			fontFamily: {
				cyber: ['Orbitron', 'monospace'],
				mono: ['JetBrains Mono', 'monospace']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%': { opacity: '0.7', filter: 'blur(8px)' },
					'100%': { opacity: '1', filter: 'blur(12px)' }
				},
				'text-glow': {
					'0%': { textShadow: '0 0 10px hsl(var(--primary) / 0.8)' },
					'100%': { textShadow: '0 0 20px hsl(var(--primary) / 1), 0 0 30px hsl(var(--primary) / 0.6)' }
				},
				'entrance': {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(50px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'trail-fade': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0', transform: 'scale(0.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
				'text-glow': 'text-glow 2s ease-in-out infinite alternate',
				'entrance': 'entrance 0.8s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.6s ease-out forwards',
				'trail-fade': 'trail-fade 0.5s ease-out forwards'
			},
			boxShadow: {
				'glow-purple': 'var(--glow-purple)',
				'glow-cyan': 'var(--glow-cyan)',
				'glow-pink': 'var(--glow-pink)',
				'neon': 'var(--shadow-neon)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

import { FC } from 'react';

interface CinematicOverlayProps {
  isVisible: boolean;
}

/**
 * Cinematic text overlay with neon glow effects
 * Displays "Happy Birthday" and "Aysha" with romantic styling
 */
const CinematicOverlay: FC<CinematicOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center pointer-events-none px-4" style={{ paddingTop: '10vh' }}>
      {/* Happy Birthday text */}
      <h2 
        className="font-romantic text-foreground neon-text-soft opacity-0 animate-fade-in-up mb-2"
        style={{ 
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          animationDelay: '0s',
          animationFillMode: 'forwards'
        }}
      >
        Happy Birthday
      </h2>

      {/* Main name - AYSHA with strongest glow */}
      <h1 
        className="font-romantic text-primary opacity-0 animate-fade-in-up"
        style={{ 
          fontSize: 'clamp(3.5rem, 15vw, 9rem)',
          animationDelay: '0.8s',
          animationFillMode: 'forwards',
          letterSpacing: '0.1em',
          lineHeight: 1.1,
          textShadow: `
            0 0 5px hsl(330 100% 70% / 1),
            0 0 10px hsl(330 100% 70% / 0.9),
            0 0 20px hsl(330 100% 70% / 0.7),
            0 0 40px hsl(330 100% 70% / 0.5),
            0 0 60px hsl(280 80% 75% / 0.4),
            0 0 100px hsl(280 80% 75% / 0.3)
          `,
          animation: 'fadeInUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, neonPulse 3s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite, breathe 4s cubic-bezier(0.4, 0, 0.6, 1) 2s infinite',
        }}
      >
        Aysha
      </h1>

      {/* Birthday message in glass card */}
      <div 
        className="glass-card rounded-2xl px-6 py-4 sm:px-8 sm:py-5 mt-6 max-w-md mx-auto opacity-0 animate-fade-in-up"
        style={{ 
          animationDelay: '1.8s',
          animationFillMode: 'forwards'
        }}
      >
        <p 
          className="font-romantic text-foreground/90 text-center neon-text-soft"
          style={{ 
            fontSize: 'clamp(0.85rem, 2.5vw, 1.2rem)',
            lineHeight: 1.6,
          }}
        >
          May your life bloom with happiness, love & beautiful dreams ✨
        </p>
      </div>

      {/* Subtle instruction hint */}
      <p 
        className="text-muted-foreground/50 text-xs sm:text-sm mt-6 opacity-0 animate-fade-in-up"
        style={{ 
          animationDelay: '3s',
          animationFillMode: 'forwards'
        }}
      >
        ✨ Tap anywhere for magic ✨
      </p>
    </div>
  );
};

export default CinematicOverlay;

import { useState, useEffect, useCallback, useRef } from 'react';
import FlowerAnimation from '@/components/FlowerAnimation';
import CinematicOverlay from '@/components/CinematicOverlay';
import ParticleSystem from '@/components/ParticleSystem';
import AnimatedBook from '@/components/AnimatedBook';
import AudioController from '@/components/AudioController';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const sparkleIdRef = useRef(0);

  // Initial load sequence
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(loadTimer);
  }, []);

  // Show cinematic content after flowers start blooming
  useEffect(() => {
    if (isLoaded) {
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1500);

      const bookTimer = setTimeout(() => {
        setShowBook(true);
      }, 7000);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(bookTimer);
      };
    }
  }, [isLoaded]);

  // Handle first interaction - start audio and show glow
  const handleFirstInteraction = useCallback(() => {
    if (!audioStarted) {
      setAudioStarted(true);
      setShowGlow(true);
      setTimeout(() => setShowGlow(false), 600);
    }
  }, [audioStarted]);

  // Create sparkles on tap/click
  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    handleFirstInteraction();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Create sparkles
    const newSparkles = Array.from({ length: 5 }, () => ({
      id: sparkleIdRef.current++,
      x: clientX + (Math.random() - 0.5) * 60,
      y: clientY + (Math.random() - 0.5) * 60,
    }));
    
    setSparkles(prev => [...prev, ...newSparkles]);
    
    // Remove sparkles after animation
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
    }, 800);
  }, [handleFirstInteraction]);

  return (
    <div 
      className="relative min-h-screen min-h-dvh overflow-hidden bg-background"
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      {/* Screen glow effect on first interaction */}
      {showGlow && (
        <div 
          className="fixed inset-0 z-[9999] pointer-events-none animate-screen-glow"
          style={{
            background: 'radial-gradient(circle at center, hsl(330 100% 70% / 0.3) 0%, transparent 70%)'
          }}
        />
      )}

      {/* Sparkles from taps */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            zIndex: 10000,
          }}
        />
      ))}

      {/* Audio controller */}
      <AudioController isPlaying={audioStarted} />

      {/* Flower animation layer */}
      <FlowerAnimation isLoaded={isLoaded} />

      {/* Floating particles */}
      <ParticleSystem />

      {/* Cinematic text overlay */}
      <CinematicOverlay isVisible={showContent} />

      {/* Animated book */}
      <AnimatedBook 
        isVisible={showBook} 
        onInteraction={handleFirstInteraction}
      />

      {/* Vignette overlay */}
      <div className="vignette" />
    </div>
  );
};

export default Index;

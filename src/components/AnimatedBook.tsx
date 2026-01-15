import { FC, useState, useEffect, useCallback } from 'react';

interface AnimatedBookProps {
  isVisible: boolean;
  onInteraction: () => void;
}

/**
 * Animated 3D book with handwritten note
 * Opens automatically, closes on tap with sparkle effect
 */
const AnimatedBook: FC<AnimatedBookProps> = ({ isVisible, onInteraction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textLines, setTextLines] = useState<boolean[]>([false, false, false, false]);

  // Open book after becoming visible
  useEffect(() => {
    if (isVisible) {
      const openTimer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 1500);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(textTimer);
      };
    }
  }, [isVisible]);

  // Typewriter effect for text lines
  useEffect(() => {
    if (showText) {
      textLines.forEach((_, index) => {
        setTimeout(() => {
          setTextLines(prev => {
            const newLines = [...prev];
            newLines[index] = true;
            return newLines;
          });
        }, index * 600);
      });
    }
  }, [showText]);

  const handleBookClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onInteraction();
    setIsOpen(prev => !prev);
  }, [onInteraction]);

  if (!isVisible) return null;

  const noteLines = [
    "To my dearest Aysha,",
    "On this special day,",
    "may all your dreams",
    "come true. 💕"
  ];

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 cursor-pointer opacity-0 animate-fade-in-up"
      style={{ 
        animationDelay: '0s',
        animationFillMode: 'forwards'
      }}
      onClick={handleBookClick}
    >
      <div className="book-container">
        <div 
          className="relative"
          style={{
            width: 'clamp(180px, 40vw, 280px)',
            height: 'clamp(120px, 25vw, 180px)',
          }}
        >
          {/* Book base/back cover */}
          <div 
            className="absolute inset-0 rounded-lg book-cover"
            style={{
              boxShadow: '0 10px 40px hsl(0 0% 0% / 0.6), 0 0 20px hsl(330 70% 50% / 0.2)',
            }}
          />

          {/* Book pages */}
          <div 
            className="absolute inset-1 rounded-r-sm book-page"
            style={{
              transformOrigin: 'left center',
              transform: isOpen ? 'perspective(800px) rotateY(-10deg)' : 'perspective(800px) rotateY(0deg)',
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Front cover that opens */}
          <div 
            className="absolute inset-0 rounded-lg book-cover flex items-center justify-center"
            style={{
              transformOrigin: 'left center',
              transform: isOpen ? 'perspective(1000px) rotateY(-160deg)' : 'perspective(1000px) rotateY(0deg)',
              transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Cover decoration */}
            <div 
              className="text-center font-romantic"
              style={{
                color: 'hsl(330 60% 80%)',
                fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                textShadow: '0 0 10px hsl(330 70% 70% / 0.5)',
              }}
            >
              ✨ For You ✨
            </div>
          </div>

          {/* Inside page with handwritten note */}
          <div 
            className="absolute inset-1 rounded-r-sm book-page flex items-center justify-center p-4 overflow-hidden"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.5s',
            }}
          >
            <div className="text-center space-y-1">
              {noteLines.map((line, index) => (
                <p
                  key={index}
                  className="font-romantic transition-all duration-500"
                  style={{
                    color: 'hsl(330 30% 35%)',
                    fontSize: 'clamp(0.65rem, 1.8vw, 1rem)',
                    opacity: textLines[index] ? 1 : 0,
                    transform: textLines[index] ? 'translateY(0)' : 'translateY(5px)',
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Decorative glow when open */}
          {isOpen && (
            <div 
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: 'radial-gradient(ellipse at center, hsl(330 70% 70% / 0.15) 0%, transparent 60%)',
                animation: 'breathe 3s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Hint text */}
        <p 
          className="text-center text-muted-foreground/40 text-xs mt-3 font-romantic"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.5s ease-out 1s',
          }}
        >
          tap to close
        </p>
      </div>
    </div>
  );
};

export default AnimatedBook;

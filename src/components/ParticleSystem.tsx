import { FC, useMemo } from 'react';

/**
 * CSS-only floating particle system
 * Creates ambient magical particles floating upward
 */
const ParticleSystem: FC = () => {
  // Generate particles with random properties
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 30}%`,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 80,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
            '--drift': `${particle.drift}px`,
            opacity: particle.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;

import { FC, useEffect, useRef } from 'react';

interface AudioControllerProps {
  isPlaying: boolean;
}

/**
 * Hidden audio controller for background music
 * Plays from /sound/mp.mp4 when triggered
 * Falls back gracefully if audio file is not available
 */
const AudioController: FC<AudioControllerProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Try to play audio
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Audio playback failed (file not found or blocked by browser)
            console.log('Audio playback failed:', error.message);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src="/sound/mp.mp3"
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioController;

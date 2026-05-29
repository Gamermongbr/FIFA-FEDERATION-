import { useState, useEffect, useRef } from 'react';

const SONGS = [
  'https://files.catbox.moe/0si8tp.mp3',
  'https://files.catbox.moe/5xbq9h.mp3'
];

export function useBackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 0.3;
    
    let isUnmounted = false;
    let lastPlayedIdx = -1;

    const playNextSong = () => {
      if (isUnmounted) return;
      
      let nextIdx = Math.floor(Math.random() * SONGS.length);
      // Prevent repeating the same song consecutively
      if (SONGS.length > 1) {
        while (nextIdx === lastPlayedIdx) {
          nextIdx = Math.floor(Math.random() * SONGS.length);
        }
      }
      
      lastPlayedIdx = nextIdx;
      audio.src = SONGS[nextIdx];
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay blocked, waiting for user interaction...", err);
          const startAudio = () => {
            if (!audio.muted && audio.paused) {
              audio.play().catch(() => {});
            }
            document.removeEventListener('click', startAudio);
            document.removeEventListener('touchstart', startAudio);
            document.removeEventListener('keydown', startAudio);
          };
          document.addEventListener('click', startAudio);
          document.addEventListener('touchstart', startAudio);
          document.addEventListener('keydown', startAudio);
        });
      }
    };

    audio.addEventListener('ended', playNextSong);
    audio.addEventListener('error', () => {
      console.warn("Audio load error, skipping to another track...");
      setTimeout(playNextSong, 2000);
    });

    playNextSong();

    return () => {
      isUnmounted = true;
      audio.removeEventListener('ended', playNextSong);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && audioRef.current.paused && audioRef.current.src) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return { isMuted, toggleMute };
}

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
    audio.preload = 'auto'; // Optimize for smooth playback without full download delay

    let isUnmounted = false;
    let isFirstPlay = true;

    const playRandomSong = () => {
      if (isUnmounted) return;
      const randomIdx = Math.floor(Math.random() * SONGS.length);
      audio.src = SONGS[randomIdx];
      audio.load(); // Tells browser to start downloading and buffering immediately
    };

    const attemptPlay = () => {
      if (isUnmounted) return;
      const playPromise = audio.play();
      
      if (isFirstPlay && playPromise !== undefined) {
         isFirstPlay = false;
         playPromise.catch((err) => {
            console.warn("Autoplay blocked, waiting for user interaction...", err);
            const startAudio = () => {
              if (!audio.muted && audio.paused) {
                audio.play().catch(() => {});
              }
              document.removeEventListener('click', startAudio);
              document.removeEventListener('touchstart', startAudio);
            };
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
         });
      } else if (playPromise !== undefined) {
         playPromise.catch(() => {});
      }
    };

    // 'canplaythrough' ensures the browser has buffered enough to play smoothly to the end
    audio.addEventListener('canplaythrough', attemptPlay);
    audio.addEventListener('ended', playRandomSong);
    audio.addEventListener('error', () => {
      console.warn("Audio load error, skipping to another track...");
      setTimeout(playRandomSong, 2000);
    });

    playRandomSong();

    return () => {
      isUnmounted = true;
      audio.removeEventListener('canplaythrough', attemptPlay);
      audio.removeEventListener('ended', playRandomSong);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && audioRef.current.paused && audioRef.current.readyState >= 3) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  const toggleMute = () => setIsMuted(prev => !prev);

  return { isMuted, toggleMute };
}

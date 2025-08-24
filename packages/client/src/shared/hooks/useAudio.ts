import { useRef, useEffect, useState } from 'react';
import { IAudioHooksProps } from '@/app/router/types';

const useAudio = (url: string, loop: boolean): IAudioHooksProps => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = loop;
    audio.volume = 0.5;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
  }, [url, loop]);

  const play = async (): Promise<void> => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Воспроизведение не удалось запустить:', error);
    }
  };

  const pause = (): void => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stop = (): void => {
    pause();
    audioRef.current.currentTime = 0;
  };

  return { isPlaying, play, pause, stop };
};

export default useAudio;

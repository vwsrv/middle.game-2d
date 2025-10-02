import { useEffect, useState } from 'react';

export interface IFullScreenApi {
  isFullscreen: boolean;
  handleFullscreen: () => void;
}

const useFullScreen = (container?: HTMLElement): IFullScreenApi => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const targetElement = container || document.body;
    if (!document.fullscreenEnabled) {
      console.log('Полноэкранный режим не поддерживается или заблокирован');
      return;
    }
    if (!document.fullscreenElement) {
      targetElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, handleFullscreen };
};

export default useFullScreen;

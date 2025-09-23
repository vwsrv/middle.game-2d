import useAudio from '@/shared/hooks/useAudio';
import { Button } from 'antd';
import {
  SoundOutlined,
  MutedOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import styles from './game-footer.module.scss';
import useFullScreen from '@/shared/hooks/use-fullscreen';

export const GameFooter = () => {
  const {
    isPlaying,
    play: playMusic,
    pause: pauseMusic,
  } = useAudio('/audio/fon.mp3', true);

  const toggle = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const { isFullscreen, handleFullscreen } = useFullScreen();

  return (
    <section className={`${styles.container}`}>
      <Button
        type={isPlaying ? 'primary' : 'default'}
        size="middle"
        onClick={toggle}
        icon={isPlaying ? <SoundOutlined /> : <MutedOutlined />}
      />
      <Button
        type={isFullscreen ? 'primary' : 'default'}
        size="middle"
        onClick={handleFullscreen}
        icon={
          isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
        }
      />
    </section>
  );
};

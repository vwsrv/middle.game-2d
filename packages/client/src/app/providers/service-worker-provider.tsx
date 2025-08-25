import { ComponentPropsWithoutRef, FC, useEffect } from 'react';
import { useServiceWorker } from '@/shared/hooks/use-service-worker';
import { notification } from 'antd';

export const ServiceWorkerProvider: FC<ComponentPropsWithoutRef<'div'>> = ({
  children,
}) => {
  const sw = useServiceWorker();

  useEffect(() => {
    if (sw.error) {
      notification.warning({
        message: 'Предупреждение',
        description:
          'В случае отключения от сети прогресс игры не будет сохранен',
      });
    } else if (sw.active) {
      notification.success({
        message: 'Уведомление',
        description: 'В случае отключения от сети прогресс игры будет сохранен',
      });
    }
  }, []);

  return <>{children}</>;
};

export default ServiceWorkerProvider;

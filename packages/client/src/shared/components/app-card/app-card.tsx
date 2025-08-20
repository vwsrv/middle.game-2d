import { FC } from 'react';
import stypes from './card.module.scss';

type TCard = {
  className?: string;
  children: React.ReactNode;
};

export const Card: FC<TCard> = (props: TCard) => {
  const { children, className } = props;

  return (
    <>
      <section className={`${stypes.card} ${className || ''}`.trim()}>
        {children}
      </section>
    </>
  );
};

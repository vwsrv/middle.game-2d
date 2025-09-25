import { FC, ReactNode } from 'react';
import styles from './card.module.scss';

type TCard = {
  className?: string;
  children: ReactNode;
};

const Card: FC<TCard> = (props: TCard) => {
  const { children, className } = props;

  return (
    <>
      <section className={`${styles.card} ${className || ''}`.trim()}>
        {children}
      </section>
    </>
  );
};

export default Card;

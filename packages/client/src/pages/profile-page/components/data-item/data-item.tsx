import { FC } from 'react';
import styles from './data-item.module.scss';

type TProfileDataItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export const ProfileDataItem: FC<TProfileDataItem> = props => {
  return (
    <li className={`${styles.item}`}>
      <div className={`${styles.item__label}`}>
        {props?.icon}
        {props?.label}
      </div>
      <div className={`${styles.item__value}`}>{props?.value}</div>
    </li>
  );
};

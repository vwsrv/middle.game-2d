import { FC, ReactNode } from 'react';
import './page-wrapper.scss';

export type PageWrapperProps = {
  title: string;
  children: ReactNode;
};

const PageWrapper: FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1 className="page-wrapper__title">{title}</h1>
        <div className="page-wrapper__content">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;

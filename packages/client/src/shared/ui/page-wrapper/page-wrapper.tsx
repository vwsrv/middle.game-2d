import { FC, ReactNode } from 'react';
import './page-wrapper.scss';
import Header from '@/widgets/header/header';
import { Footer } from 'antd/es/layout/layout';
import { Space } from 'antd';
import Text from 'antd/es/typography/Text';
import { useSSRConfig } from '@/shared/contexts/ssr-context';
import { useTranslation } from '@/shared/i18n';
import { useAuth } from '@/features';

export type PageWrapperProps = {
  title?: string;
  children: ReactNode;
  headerContent?: React.ReactNode;
  backButton?: string;
};

const PageWrapper: FC<PageWrapperProps> = ({
  title,
  children,
  headerContent,
  backButton,
}) => {
  const { t } = useTranslation();
  const { currentYear } = useSSRConfig();
  const { isAuth } = useAuth();
  return (
    <div className="page-container">
      {isAuth && (
        <Header {...(backButton && { backButton: backButton })}>
          {headerContent || null}
        </Header>
      )}

      <div className="content-container">
        <div className="page-wrapper">
          <h1 className="page-wrapper__title">{title}</h1>
          <div className="page-wrapper__content">{children}</div>
        </div>
      </div>
      <Footer className="footer">
        <Space direction="vertical" size="small">
          <Text type="secondary">
            {t('main_page.footer.copyright', {
              year: currentYear,
            })}
          </Text>
        </Space>
      </Footer>
    </div>
  );
};

export default PageWrapper;

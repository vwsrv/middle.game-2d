import { Button, Menu, Space, Typography } from 'antd';
import { Header as Head } from 'antd/es/layout/layout';
import { getMenuItems } from '@/pages/main-page/constants/data';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/shared/i18n';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/features/global-slice/global-slice';
import { useSSRConfig } from '@/shared/contexts/ssr-context';

const { Title } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const { isMobile, language } = useSSRConfig();
  const menuItems = getMenuItems(isMobile);

  const location = useLocation();
  const selectedKey =
    menuItems.find(item => item.path === location.pathname)?.key || 'home';

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  return (
    <Head>
      <div className="logo" style={{ float: 'left', marginRight: '24px' }}>
        <Title level={3} style={{ margin: 0 }}>
          <span style={{ color: '#ff4d4f' }}>Apple</span>
          <span style={{ color: '#52c41a' }}>Worm</span>
        </Title>
      </div>

      <Menu mode="horizontal" selectedKeys={[selectedKey]} items={menuItems} />

      <Space style={{ float: 'right' }}>
        <Button
          type={language === 'ru' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('ru')}>
          RU
        </Button>

        <Button
          type={language === 'en' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('en')}>
          EN
        </Button>
      </Space>
    </Head>
  );
};

export default Header;

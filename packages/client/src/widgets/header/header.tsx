import { Button, Menu, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { getMenuItems } from '@/pages/main-page/constants/data';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/shared/i18n';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/features/global-slice/globalSlice';

const { Title } = Typography;

export const HeaderApp = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const menuItems = getMenuItems(isMobile);
  const location = useLocation();
  const selectedKey =
    menuItems.find(item => item.path === location.pathname)?.key || 'home';

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  return (
    <Header>
      <div className="logo" style={{ float: 'left', marginRight: '24px' }}>
        <Title level={3} style={{ margin: 0 }}>
          <span style={{ color: '#ff4d4f' }}>Apple</span>
          <span style={{ color: '#52c41a' }}>Worm</span>
        </Title>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ flex: 1 }}
      />

      <Space style={{ float: 'right' }}>
        <Button
          type={i18n.language === 'ru' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('ru')}>
          RU
        </Button>
        <Button
          type={i18n.language === 'en' ? 'primary' : 'default'}
          size="small"
          onClick={() => onChangeLanguage('en')}>
          EN
        </Button>
      </Space>
    </Header>
  );
};

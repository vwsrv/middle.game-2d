import { Menu, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { getMenuItems } from '@/pages/main-page/constants/data'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { useLocation } from 'react-router-dom'

const { Title } = Typography

export const HeaderApp = () => {
  const screens = useBreakpoint()
  const isMobile = !screens.md
  const menuItems = getMenuItems(isMobile)
  const location = useLocation()
  const selectedKey =
    menuItems.find(item => item.path === location.pathname)?.key || 'home'

  return (
    <Header style={{ background: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
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
    </Header>
  )
}

import { FC } from 'react'
import './app-avatar.scss'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

type TAppAvatar = {
  size: number
  src?: string
}

export const AppAvatar: FC<TAppAvatar> = (props: TAppAvatar) => {
  return (
    <Avatar
      size={props.size}
      src={props.src}
      icon={<UserOutlined />}
      className="profile-avatar"
    />
  )
}

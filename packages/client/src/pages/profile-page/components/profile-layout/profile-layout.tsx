import { Outlet } from 'react-router-dom';
import './profile-layout.scss';

const ProfileLayout = () => {
  return (
    <div className="profile-layout-container">
      <Outlet />
    </div>
  );
};

export default ProfileLayout;

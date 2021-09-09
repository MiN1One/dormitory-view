import { useDispatch } from 'react-redux';
import axios from 'axios';
import { RiLogoutBoxLine } from 'react-icons/ri';

import SpyNavigation from '../../../components/SpyNavigation/SpyNavigation';
import * as actions from '../../../store/actions';
import { useTranslation } from 'react-i18next';
import config from '../config';

const ProfileNav = ({ userRole, activeSectionState }) => {
  const [activeSection, setActiveSection] = activeSectionState;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onLogout = () => {
    axios('/api/users/logout', { withCredentials: true })
      .then(() => dispatch(actions.setAuthStatus(null)))
      .catch(e => console.error(e));
  };
  
  // const onUpdateSection = () => {
    
  // };

  return (
    <SpyNavigation 
      offset={0} 
      items={config.SECTIONS[userRole]} 
      onUpdate={setActiveSection}>
        <div className="flex h-100">
          {/* <button className="snav__btn">
            Update
          </button> */}
          <button className="snav__btn snav__btn--danger" onClick={onLogout}>
            Log out
            <RiLogoutBoxLine className="icon ml-5" />
          </button>
        </div>
    </SpyNavigation>
  );
};

export default ProfileNav;

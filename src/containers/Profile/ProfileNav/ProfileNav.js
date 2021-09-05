import { useDispatch } from 'react-redux';
import axios from 'axios';

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
  
  const onUpdateSection = () => {
    
  };

  

  return (
    <SpyNavigation 
      offset={0} 
      items={config.SECTIONS[userRole]} 
      onUpdate={setActiveSection}>
        <div>
          <button className="profile__btn-nav">
            Update
          </button>
          <button className="profile__btn-nav profile__btn-nav--danger" onClick={onLogout}>
            Log out
          </button>
        </div>
    </SpyNavigation>
  );
};

export default ProfileNav;

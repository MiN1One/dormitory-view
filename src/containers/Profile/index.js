import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import useFetchData from '../../hooks/useFetchData';

import './index.scss';
import Dashboard from './Dashboard/Dashboard';
import ProfileNav from './ProfileNav/ProfileNav';
import config from './config';
import { Loader } from '../../hoc/LazyLoad';
import Reviews from '../../components/Reviews/Reviews';

const Profile = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeSetion, setActiveSection] = useState(config.SECTIONS[0]);

  const {
    data, 
    loading, 
    error,
    makeRequest
  } = useFetchData({ loading: true });

  useEffect(() => {
    (user && user._id) && makeRequest({
      url: `api/users/${user._id}`,
      dataAt: ['data', 'doc']
    });
  }, [makeRequest, user]);

  if (!data && !error) {
    return <Loader />;
  }
  console.log(data)

  return (
    <main className="profile">
      <ProfileNav 
        data={data}
        activeSectionState={[activeSetion, setActiveSection]}
        userRole={data.role} />
      <Dashboard />
      <Reviews />
    </main>
  );
};

export default memo(Profile);

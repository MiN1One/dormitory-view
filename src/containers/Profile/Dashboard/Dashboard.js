import React, { useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchData';

import { Loader } from '../../../hoc/LazyLoad';

const Dashboard = ({ data }) => {
  return (
    <div className="profile__section" id="dashboard">
      <div className="container">
        <div className="profile__dashboard">
          <div className="profile__dashboard__left">
            {JSON.stringify(data)}
          </div>
          <div className="profile__dashboard__right">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

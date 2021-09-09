import React, { useEffect } from 'react';
import useFetchData from '../../../hooks/useFetchData';

import { Loader } from '../../../hoc/LazyLoad';

const Dashboard = ({ data }) => {
  console.log(data)
  return (
    <div className="profile__section" id="dashboard">
      <div className="container">
        <div className="profile__dashboard">
          <div className="profile__dashboard__left">
            <h1 className="profile__name">
              {data.name} 
            </h1>
            <h2 className="profile__role">
              {data.role}
            </h2>
          </div>
          <div className="profile__dashboard__right">

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

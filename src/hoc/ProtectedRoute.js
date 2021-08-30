import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import RouteWithParams from './RouteWithParams';

const ProtectedRoute = ({ children, path, exact }) => {
  const { user, token } = useSelector(s => s.user);
  const location = useLocation();

  return (
    <RouteWithParams path={path} exact={exact}>
      {(user && token)
        ? children
        : <Redirect to={{
            pathname: '/auth/signin', 
            state: { ...location }
          }} />
      }
    </RouteWithParams>
  );
};

export default ProtectedRoute;
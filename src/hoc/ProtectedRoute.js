import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, path, exact }) => {
  const { user, token } = useSelector(s => s.user);
  const location = useLocation();

  return (
    <Route path={path} exact={exact}>
      {(user && token)
        ? children
        : <Redirect to={{
            pathname: '/auth/signin', 
            state: { ...location }
          }} />
      }
    </Route>
  );
};

export default ProtectedRoute;
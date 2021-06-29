import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, path, exact }) => {
  const { user } = useSelector(s => s.user);
  const location = useLocation();

  console.log(user);
  console.log(path);
  console.log(location.pathname);

  return (
    <Route path={path} exact={exact}>
      {user
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
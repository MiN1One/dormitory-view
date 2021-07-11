import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import './index.scss';
import useFetchData from "../../hooks/useFetchData";
import useTitle from "../../hooks/useTitle";

const AsyncSignin = React.lazy(() => import('./Signin/Signin'));
const AsyncSignup = React.lazy(() => import('./Signup/Signup'));

const Auth = () => {
  const history = useHistory();
  const { user } = useSelector(state => state.user);
  const location = useLocation();
  const { t } = useTranslation();
  const [type, setType] = useState(null);

  useTitle('Authorization');

  const { data, makeRequest, loading } = useFetchData();

  useEffect(() => {
    makeRequest({ url: 'data/auth.json' });
  }, [makeRequest]);
  
  useEffect(() => {
    const authType = location.pathname.substr(1).split('/')[1];
    authType && setType(authType);
  }, [location.pathname]);
  
  console.log(type);
  if (user && user.token) 
    history.replace('/myprofile');

  return (
    <div className="auth">
      <div className={`auth__modal ${type ? `auth__modal--${type}` : ''}`}>
        <div 
          className="auth__left"
          style={{
            backgroundImage: data && `url(/${type ? data[type] : data.default})`
          }}>
          <button 
            className="auth__btn-back tooltip" 
            onClick={() => 
              history.replace(location.state?.pathname || '/')
            }>
              <BiArrowBack className="icon--mid icon--grey" />
              <div className="tooltip__text tooltip__text--bottom auth__tooltip">
                Go back
              </div>
          </button>
        </div>
        <div className="auth__right">
          <div className="auth__head">
            {!type && <div className="f-xl mb-lg">LOGO</div>}
            <h2 className="heading heading--2 c-black mb-2">
              {type ? t(`auth.${type}`) : 'Welcome to Holis!'}
            </h2>
            <div className="flex">
              <NavLink 
                to="/auth/signin" 
                activeClassName="tab-item--active"
                className="tab-item tab-item--lg">
                  Sign in
              </NavLink>
              <NavLink 
                to="/auth/signup" 
                activeClassName="tab-item--active"
                className="tab-item tab-item--lg">
                  Sign up
              </NavLink>
            </div>
          </div>
          <Switch>
            <Route path="/auth/signin">
              <AsyncSignin />
            </Route>
            <Route path="/auth/signup">
              <AsyncSignup />
            </Route>
          </Switch>
          <div className="flex jcc fdc aic">
            <span className="auth__line">Or</span>
            <div className="flex aic c-grey-l f-mid f-thin">
              Continue with
              <button className="auth__vendor-btn">
                <FcGoogle className="icon" />
              </button>
            </div>
          </div>
          <div className="auth__footer">
            By continuing, I accept the&nbsp;<Link to="/" className="undl">Terms of Use</Link>,&nbsp;<Link to="/" className="undl">Acceptable Use Policy</Link>,&nbsp;<Link to="/" className="undl">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Auth);
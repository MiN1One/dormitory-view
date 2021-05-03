import React from "react";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from "react-redux";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import './Auth.scss';

const AsyncSignin = React.lazy(() => import('./Signin/Signin'));
const AsyncSignup = React.lazy(() => import('./Signup/Signup'));

const Auth = () => {
  const history = useHistory();
  const { user } = useSelector(state => state.user);

  if (user && user.token) 
    history.replace('/myprofile');

  return (
    <div className="auth">
      <div className="auth__modal">
        <div className="auth__left">
          <button className="auth__btn-back tooltip" onClick={() => history.replace('/')}>
            <BiArrowBack className="icon--mid icon--grey" />
            <div className="tooltip__text tooltip__text--left">
              Go back home
            </div>
          </button>
        </div>
        <div className="auth__right">
          <div className="auth__head">
            <h2 className="heading heading--2 c-black mb-2">Hehe boay!</h2>
            <div className="flex">
              <NavLink 
                to="/auth/login" 
                activeClassName="tab-item--active"
                className="tab-item tab-item--lg">
                  Login
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
            <Route path="/auth/login" exact>
              <AsyncSignin />
            </Route>
            <Route path="/auth/signup" exact>
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
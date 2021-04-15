import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';

import './Auth.scss';

const Auth = () => {
  const history = useHistory();

  return (
    <main className="auth">
      <div className="auth__modal">
        <div className="auth__left">
          <button className="auth__btn-back" onClick={() => history.goBack()}>
            <BiArrowBack className="icon--mid icon--grey" />
          </button>
        </div>
        <div className="auth__right">
          <div className="auth__head">
            <h2 className="heading heading--2 c-black mb-3">Hehe boay!</h2>
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
              <Login />
            </Route>
            <Route path="/auth/signup" exact>
              <Signup />
            </Route>
          </Switch>
          <div className="auth__footer">
            By continuing, I accept the&nbsp;<Link to="/" className="undl">Terms of Use</Link>,&nbsp;<Link to="/" className="undl">Acceptable Use Policy</Link>,&nbsp;<Link to="/" className="undl">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      emailRef.current.value === '' || 
      passRef.current.value === ''
    ) {
      emailRef.current.setCustomValidity('invalid');
      passRef.current.setCustomValidity('invalid');
      return;
    }

  };

  return (
    <>
      <form className="auth__body" onSubmit={(e) => onSubmit(e)}>
        <label className="input__label mb-2">
          <input 
            className="input input--main auth__input" 
            placeholder="Your email address" 
            type="email"
            ref={emailRef} />
          <span className="input__invalid">Please enter valid email address</span>
        </label>
        <label className="input__label mb-2">
          <input 
            className="input input--main auth__input" 
            placeholder="Your password" 
            type="password"
            minLength="6"
            ref={passRef} />
          <button 
            type="button"
            className="input__btn" 
            onClick={() => {
              setShowPassword(prev => !prev);
              passRef.current.type === 'password' 
                ? passRef.current.type = 'text' 
                : passRef.current.type = 'password';
            }}>
              {!showPassword
                ? <BsEyeSlash className="icon--sm icon--grey-l" />
                : <BsEye className="icon--sm icon--tertiary" />
              }
          </button>
          <span className="input__invalid">Please enter valid password</span>
        </label>
        <button className="btn btn--cta btn--arrow mb-1" type="submit">
          Login
          <HiArrowNarrowRight className="icon icon--dark" />
        </button>
        <Link to="/auth/forgotpassword" className="inline tc f-thin f-mid c-tertiary">
          Forgot password?
        </Link>
      </form>
      <div className="flex jcc fdc aic">
        <span className="auth__line">Or</span>
        <div className="flex aic c-grey-l f-mid f-thin">
          Continue with
          <button className="auth__vendor-btn">
            <FcGoogle className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

const Signup = () => {

  return (
    <form>

    </form>
  );
};

export default React.memo(Auth);
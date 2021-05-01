import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash, BsCheck } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import * as emailValidator from 'email-validator';
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadComponent } from "react-lazy-load-image-component";

import axios from '../../axios';
import * as actions from '../../store/actions';
import './Auth.scss';
import Scrollbar from "../../components/UI/Scrollbar/Scrollbar";

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
              <LazyLoadComponent>
                <Login />
              </LazyLoadComponent>
            </Route>
            <Route path="/auth/signup" exact>
              <LazyLoadComponent>
                <Signup />
              </LazyLoadComponent>
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [remember, setRemember] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      emailRef.current.value === '' || 
      passRef.current.value === ''
    ) return setError('Please fill out all of the fields');
    
    if (!emailValidator.validate(emailRef.current.value))
      return setError('Please provide valid email address');

    axios.post('/users/login', {
      email: emailRef.current.value,
      password: passRef.current.value,
      remember
    }).then(res => {
      console.log(res);
      setError(null);
      history.replace('/');
      res.data.user.token = res.data.token;
      dispatch(actions.login(res.data.user))
    }).catch(er => {
      if (er.response)
        setError(er.response.data.message);
      else setError(er.message);
    });
  };

  return (
    <form className="auth__body" onSubmit={(e) => onSubmit(e)}>
      {error && <p className="input__invalid">{error}</p>}
      <label className="input__label mb-15">
        <input 
          className="input input--main auth__input" 
          placeholder="Your email address" 
          type="email"
          ref={emailRef} />
        <span className="input__label-text">Your email address</span>
      </label>
      <label className="input__label mb-15">
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
        <span className="input__label-text">Your password</span>
      </label>
      <div 
        className={`input__checkbox-wrapper mb-15 ${remember ? 'input__checkbox-wrapper--active' : ''}`}
        tabIndex="0" 
        onClick={() => setRemember(prev => !prev)}>
          <span className="input__checkbox mr-5">
            {remember && <BsCheck className="icon icon--tertiary" />}
          </span>
          Remember me
      </div>
      <button className="btn btn--cta btn--arrow mb-1" type="submit">
        Login
        <HiArrowNarrowRight className="icon" />
      </button>
      <Link to="/auth/forgotpassword" className="inline tc f-thin f-mid c-tertiary">
        Forgot password?
      </Link>
    </form>
  );
};

const Signup = () => {
  const [isLandlord, setIsLandlord] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const passRef = useRef();
  const passConfRef = useRef();
  const nameRef = useRef();
  const lNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      passRef.current.value === '' ||
      nameRef.current.value === '' ||
      lNameRef.current.value === '' ||
      emailRef.current.value === '' ||
      passConfRef.current.value === '' ||
      phoneRef.current.value === ''
    ) return setError('Please fill all of the fields');
    
    if (!emailValidator.validate(emailRef.current.value))
      return setError('Please provide valid email address');
      
    if (passConfRef.current.value !== passRef.current.value)
      return setError('Passwords are not the same');  

    if (phoneRef.current.value.length < 7 || phoneRef.current.value.length > 15) 
      return setError('Please provide valid phone number');

    axios.post('/users/signup', {
      name: nameRef.current.value,
      last_name: lNameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneRef.current.value,
      password: passRef.current.value,
      role: isLandlord ? 'landlord' : 'user'
    }).then(res => {
      console.log(res);
      setError(null);
    }).catch(er => {
      if (er.response)
        setError(er.response.data.message)
      else setError(er.message);
    });
  };

  return (
    <form className="auth__body" onSubmit={(e) => onSubmit(e)}>
      {error && <p className="input__invalid">{error}</p>}
      <div className="flex jcse mb-2">
        <div 
          className={`input__checkbox-wrapper mr-lg ${!isLandlord ? 'input__checkbox-wrapper--active' : ''}`} 
          onClick={() => setIsLandlord(false)}
          tabIndex="0">
            <span className="input__checkbox mr-5">
              {!isLandlord && <BsCheck className="icon icon--tertiary" />}
            </span>
            I am a student
        </div>
        <div 
          className={`input__checkbox-wrapper ${isLandlord ? 'input__checkbox-wrapper--active' : ''}`}
          onClick={() => setIsLandlord(true)}
          tabIndex="0">
            <span className="input__checkbox mr-5">
              {isLandlord && <BsCheck className="icon icon--tertiary" />}
            </span>
            I am a landlord
        </div>
      </div>
      <label className="input__label mb-15">
        <input 
          className="input input--main auth__input" 
          type="text" 
          placeholder="Your email address"
          ref={emailRef} />
        <span className="input__label-text">Your email address</span>
      </label>
      <div className="flex mb-15">
        <label className="input__label">
          <input 
            className="input input--main auth__input auth__input--sm mr-15" 
            type="text" 
            placeholder="Your name"
            ref={nameRef} />
          <span className="input__label-text">Your name</span>
        </label>
        <label className="input__label">
          <input 
            className="input input--main auth__input auth__input--sm" 
            type="text" 
            placeholder="Your last name"
            ref={lNameRef} />
          <span className="input__label-text">Your last name</span>
        </label>
      </div>
      <label className="input__label mb-15">
        <input 
          className="input input--main auth__input" 
          type="number" 
          placeholder="Your phone number"
          ref={phoneRef} />
        <span className="input__label-text">Your phone number</span>
      </label>
      <label className="input__label mb-15">
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
        <span className="input__label-text">Your password (minimum 6 characters)</span>
      </label>
      <label className="input__label mb-15">
        <input 
          className="input input--main" 
          type="password" 
          placeholder="Confirm your password"
          ref={passConfRef} />
        <span className="input__label-text">Password confirm</span>
      </label>
      <button className="btn btn--cta btn--arrow" type="submit">
        Sign up
        <HiArrowNarrowRight className="icon" />
      </button>
    </form>
  );
};

export default React.memo(Auth);
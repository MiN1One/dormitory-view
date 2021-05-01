import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";
import * as emailValidator from 'email-validator';
import { useDispatch } from "react-redux";
import { GoCheck } from "react-icons/go";

import axios from '../../../axios';
import * as actions from '../../../store/actions';

const Signin = () => {
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
            {remember && <GoCheck className="icon icon--tertiary" />}
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

export default Signin;
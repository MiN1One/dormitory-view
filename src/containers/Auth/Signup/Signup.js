import React, { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import * as emailValidator from 'email-validator';
import { GoCheck } from "react-icons/go";

import axios from '../../../axios';

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
              {!isLandlord && <GoCheck className="icon icon--tertiary" />}
            </span>
            I am a student
        </div>
        <div 
          className={`input__checkbox-wrapper ${isLandlord ? 'input__checkbox-wrapper--active' : ''}`}
          onClick={() => setIsLandlord(true)}
          tabIndex="0">
            <span className="input__checkbox mr-5">
              {isLandlord && <GoCheck className="icon icon--tertiary" />}
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

export default Signup;
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { GrFacebookOption, GrInstagram, GrLinkedinOption, GrTwitter } from 'react-icons/gr';
import { FaTelegramPlane } from 'react-icons/fa';

import Languages from '../Languages/Languages';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      {/* <div className="footer__head">
        <p className="heading heading--3 c-white mb-2">Talk to our friendly team of experts</p>
        <a href="tel:+998 95 985 58 88" className="footer__contact">
          +998 95 985 58 88
          <span className="footer__contact--sub">Local access number</span>
        </a>
      </div> */}
      <div className="container">
        <div className="footer__body">
          <div className="footer__main">
            <Link to="/" className="heading heading--2 c-black">Logo</Link>
            <div className="flex fdc">
              <div className="footer__title">Company</div>
              <Link to="/" className="footer__item">About us</Link>
              <Link to="/" className="footer__item">Careers</Link>
              <Link to="/" className="footer__item">List your property</Link>
              <Link to="/" className="footer__item">Partnets</Link>
            </div>
            <div className="flex fdc">
              <div className="footer__title">Help</div>
              <Link to="/" className="footer__item">How it works</Link>
              <Link to="/" className="footer__item">Help center</Link>
              <Link to="/" className="footer__item">Contact us</Link>
            </div>
            <div>
              <div className="mb-3">
                <div className="footer__title">Subscribe to our newsletter:</div>
                <form className="flex">
                  <input className="input input--main footer__input" placeholder="Your email address" type="email" />
                  <button className="footer__btn" type="submit">
                    Sign up
                    <HiArrowNarrowRight className="icon icon--white ml-1" />
                  </button>
                </form>
              </div>
              <div className="flex">
                <Link to="/" className="footer__social">
                  <GrFacebookOption className="icon" />
                </Link>
                <Link to="/" className="footer__social">
                  <GrInstagram className="icon" />
                </Link>
                <Link to="/" className="footer__social">
                  <FaTelegramPlane className="icon" />
                </Link>
                <Link to="/" className="footer__social">
                  <GrTwitter className="icon" />
                </Link>
                <Link to="/" className="footer__social">
                  <GrLinkedinOption className="icon" />
                </Link>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="flex mr-3">
              <Link to="/" className="footer__link">
                Privacy
              </Link>
              <Link to="/" className="footer__link">
                Sitemap
              </Link>
              <Link to="/" className="footer__link">
                Terms
              </Link>
              <div className="footer__link">
                &copy;&nbsp;Copied.com {new Date().getFullYear()}
              </div>
            </div>
            <Languages />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
import { Link } from 'react-router-dom';
import './Cities.scss';

const Cities = () => 
  <section className="cities">
    <div className="container">
      <h2 className="heading heading--2 mb-lg">We are everywhere</h2>
      <ul className="cities__list">
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Andijan</h5>
            <span className="cities__counter">153 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Bukhara</h5>
            <span className="cities__counter">104 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Fergana</h5>
            <span className="cities__counter">47 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Jizzakh</h5>
            <span className="cities__counter">98 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Urgench</h5>
            <span className="cities__counter">16 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Namangan</h5>
            <span className="cities__counter">34 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Navoiy</h5>
            <span className="cities__counter">10 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Qarshi</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Samarkand</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Guliston</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Termez</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        {/* <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Tashkent Region</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Karakalpakstan</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li>
        <li className="cities__item">
          <Link to="/" className="cities__link">
            <h5 className="heading heading--5">Tashkent</h5>
            <span className="cities__counter">31 Properties</span>
          </Link>
        </li> */}
      </ul>
    </div>
  </section>

export default Cities;

// 	Andijan
// Bukhara	Bukhara
// 	Fergana
// 	
// Xorazm	
// 	Namangan
// 	Navoiy
// Qashqadaryo	
// 	
// Sirdaryo	
// Surxondaryo	
// 	Nurafshon
// 	Nukus
// 
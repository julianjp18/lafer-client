import React from 'react';
import './footer.scss';

const Footer = ({}) => (
  <footer className="footer">
    <section className="footer__container">
      <article>
        <h2>Bogotá, Colombia</h2>  
        <p>Calle 105 # 33 - 23</p>
        <p>+57 1 435 56 96</p>
        <p>email@gmail.com</p>
      </article>
      <div className="social">
        <a href="#" className="social-item">
          <img src="/images/icons/facebook.svg" alt="icono facebook" />
        </a>
        <a href="#" className="social-item">
          <img src="/images/icons/twitter.svg" alt="icono twitter" />
        </a>
        <a href="#" className="social-item">
          <img src="/images/icons/linkedin.svg" alt="icono linkedin" />
        </a>
        <a href="#" className="social-item">
          <img src="/images/icons/youtube.svg" alt="icono youtube" />
        </a>
        <a href="#" className="social-item">
          <img src="/images/icons/telephone.svg" alt="icono telephone" />
        </a>
      </div>
    </section>
  </footer>
);

export default Footer;

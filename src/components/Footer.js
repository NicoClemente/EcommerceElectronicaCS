import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-white  p-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-md-left text-left">
            <a href="https://web.facebook.com/nicolas.clemente.92" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faFacebook} size="3x" className="mb-2" />
            </a>
            <br />
            <a href="https://www.instagram.com/nico.clemente/" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faInstagram} size="3x" />
            </a>
          </div>
          <div className="col-md-4 mt-md-0 mt-3 text-center fs-2">
            <div>
              &copy; {new Date().getFullYear()} ElectrónicaCS
            </div>
          </div>
          <div className="col-md-4 text-md-right text-center">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107374.34280008643!2d-62.282906752708!3d-38.7116898269835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc8f01545a4e1%3A0xf869cf6c61a041ad!2sBah%C3%ADa%20Blanca%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1637678836483!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

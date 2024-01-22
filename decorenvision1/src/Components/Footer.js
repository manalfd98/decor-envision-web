import React from "react";
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF , faInstagram,faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    
    <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="#">Our services</a></li>
          
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            
          </ul>
        </div>
        <div class="footer-col">
          <h4>Online Shop</h4>
          <ul>
            <li><a href="#">bed</a></li>
            <li><a href="#">Chair</a></li>
            <li><a href="#">Sofa</a></li>
            <li><a href="#">Table</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/people/D%C3%A9cor-Envision/100090132516735/?mibextid=9R9pXO"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://www.instagram.com/decor_envision/?igshid=NGVhN2U2NjQ0Yg%3D%3D"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
    </div>
 </footer>
     
  );
};

export default Footer;

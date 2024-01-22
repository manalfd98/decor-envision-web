/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Footer.css'
import img1 from './Assets/fb.jpg'
import img2 from './Assets/intsa.jpg'



const Footer = () => {
    return (
        <footer className="footer">

            <h2 className="d-flex align-items-center gap-1">

            </h2>

            <div className="follows">
                <p className="mb-0 footer-follow">Follow Us</p>
                <br />
                <span>
                    {" "}
                    <a href="#">
                        <i className="ri-facebook-line"><img src={img1} alt="" /></i>
                    </a>
                </span>
                <span>
                    {" "}
                    <a href="#">
                        <i className="ri-instagram-line"><img src={img2} alt="" /></i>
                    </a>
                </span>

            </div>



        </footer>
    )
}

export default Footer;





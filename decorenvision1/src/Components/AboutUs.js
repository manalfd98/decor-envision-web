import React from 'react'
import Navbar from './Navbar'
import b1 from '../Components/Assets/b2.jpg'
import '../Components/AboutUS.css'
import playstore from './Assets/play.jpg'
import appback from './Assets/apppart.png'



const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className='banner'>
                <img src={b1} className='imgbanner' alt='' />
                <div className="aboutus-head">About Us</div>

            </div>


            <div className='intro'>
                <p>
                    <h1>ABOUT US</h1>
                    Décor Envision is an e-commerce platform App that uses AR technology that helps the customers to visualize their desired furniture at their own place. It gives the 3D view of a product that the user chooses and having all the necessary measurements of the product in that view, Customer will be able to order the customized product by visualize the product in different color and size.
                </p>
                


            </div>


        </div>
    )
}

export default AboutUs
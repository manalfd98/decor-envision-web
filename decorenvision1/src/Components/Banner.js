import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'
import slide1 from './Assets/BannerImages/1.png'
import slide2 from './Assets/BannerImages/pic2.jpg'
import slide3 from './Assets/BannerImages/2.png'
import slide4 from './Assets/BannerImages/4.png'
import './Banner.css'


const Banner = () => {

  return (
    <Carousel>
      <Carousel.Item>
        <div className='d-flex flex-column w-100 justify-content-center align-items-center text-white' style={{
          backgroundImage: 'url("https://www.wipronorthwest.com/static/uploads/blog/blog_banner_60333c46-a8f4-4f5c-aa21-560e568f54ea6edbd98b7a20433d78ca0c06f594f75f.png")',
          height: '56vh', backgroundSize: 'cover'
        }}>
          <h3 style={{ marginLeft: '600px', fontSize: '36px', fontWeight: 'bold' }}>Visualize Furniture In A New Way</h3>
          <p style={{ marginLeft: '600px', fontSize: '18px', textAlign: 'center' }}>With our platform, you can explore all these products and more,</p>
          <p style={{ marginLeft: '600px', fontSize: '18px', textAlign: 'center' }}>and visualize them in your own space to make sure</p>
          <p style={{ marginLeft: '600px', fontSize: '18px', textAlign: 'center' }}>they're the perfect fit for your home or office</p>
          <Link to='/product-type/sofa'><button className='' style={{ marginLeft: '600px', backgroundColor:'rgb(172, 102, 102)', color:'white', fontSize:'18px', borderRadius:'10px', fontWeight:'bold', border:'none', width:'150px', height:'40px'}}>Shop Now</button></Link>



          {/* <img
            className="d-block w-100"
            src={slide1}
            alt='First Slide'
           />  */}
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className='d-flex flex-column w-100 justify-content-center align-items-center text-white' style={{
          backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0429/7654/2881/files/AR_KV-03.jpg?v=1663304970")',
          height: '56vh', backgroundSize: 'cover'
        }}>

        </div>
      </Carousel.Item>

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt='Second Slide'
        />

      </Carousel.Item> */}

      <Carousel.Item>
        <div className='d-flex flex-column w-100 justify-content-center align-items-center text-white' style={{
          backgroundImage: 'url("https://howtostartabusinessindubai.com/wp-content/uploads/2022/06/interior-design-1536x864.jpg")',
          height: '56vh', backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
          <h3 style={{ marginRight: '600px', fontSize: '36px', fontWeight: 'bold' }}>Explore Modern Furniture</h3>
          <p style={{ marginRight: '600px', fontSize: '18px', textAlign: 'center' }}>Our comfortable and stylish sofa comes in a variety of colors and sizes.</p>
          <p style={{ marginRight: '600px', fontSize: '18px', textAlign: 'center' }}>With our AR feature, you can see how it will fit in your living room</p>
          <p style={{ marginRight: '600px', fontSize: '18px', textAlign: 'center' }}>and adjust the color to match your décor.</p>
          <Link to='/product-type/sofa'><button className='' style={{ marginRight: '600px', backgroundColor:'rgb(172, 102, 102)', color:'white', fontSize:'18px', borderRadius:'10px', fontWeight:'bold', border:'none', width:'150px', height:'40px'}}>Shop Now</button></Link>


        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className='d-flex flex-column w-100 justify-content-center align-items-center text-white' style={{
          backgroundImage: 'url("https://png.pngtree.com/background/20211215/original/pngtree-modern-nordic-furniture-decoration-warm-color-simple-banner-picture-image_1495554.jpg")',
          height: '56vh', backgroundSize: 'cover', backgroundPosition: 'center center'
        }}>

        </div>
      </Carousel.Item>

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />

      </Carousel.Item> */}

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide4}
          alt="Fourth slide"
        />

      </Carousel.Item> */}



    </Carousel >
  );

}

export default Banner
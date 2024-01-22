import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './ProductComponents/ProductSlider'
import './Home.css'
import Footer from './Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'


const Home = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
            //console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers();
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();
 

  const serviceData = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2769/2769339.png",
      title: "Fast Shipping"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/484/484189.png",
      title: "Easy Returns"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/4718/4718443.png",
      title: "Secure Payment"
    },
    {
      icon: "https://static.thenounproject.com/png/538026-200.png",
      title: "Customization Request"
    }

  ]

  return (
    <div>
      <Navbar />
      <Banner />
      <br></br>

      <div className='services'>
        <Container>
          <Row>
            {
              serviceData.map((item, index) => (
                <Col lg="3" md="4" key={index}>
                  <div className='service_item'>
                    <span>
                      <img src={item.icon} alt='' width='60px' height='60px'></img>
                      {/* <i className={item.icon}></i> */}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>

      <br />
      <br />
      <h2 className='slider-head'>Shop by Category</h2>

      <div className='shopbycat'>

        <Link to='/product-type/sofa' style={{ textDecoration: 'none' }}>
          <div className='container'>
            <img src='https://cdn-icons-png.flaticon.com/512/1966/1966775.png'></img>
            <div className='content'>
              <button>Sofa</button>
              <p>Shop Now</p>
            </div>
          </div>
        </Link>

        <Link to='/product-type/chair' style={{ textDecoration: 'none' }}>
          <div className='container' style={{backgroundColor:'rgb(210, 246, 224)',}}>
            <img src='https://cdn-icons-png.flaticon.com/512/189/189322.png'></img>
            <div className='content'>

              <button>Chair</button>

              <p>Shop Now</p>
            </div>
          </div>
        </Link>

        <Link to='/product-type/bed' style={{ textDecoration: 'none' }}>
          <div className='container' style={{backgroundColor:'rgb(250, 215, 239)'}}>
            <img src='https://cdn-icons-png.flaticon.com/512/2649/2649023.png'></img>
            <div className='content'>

              <button>Bed</button>

              <p>Shop Now</p>
            </div>
          </div>
        </Link>

        <Link to='/product-type/table'style={{ textDecoration: 'none' }}>
          <div className='container' style={{backgroundColor:'rgb(240, 205, 249)'}}>
            <img src='https://cdn-icons-png.flaticon.com/512/1663/1663908.png'></img>
            <div className='content'>

              <button>Table</button>

              <p>Shop Now</p>
            </div>
          </div>
        </Link>

      </div>
      <br />

      <div className='trending_products'>
        <Container>
          <Row>
            <Col lg="12">
              <h2 className='slider-head'>Trending Products</h2>
              <ProductSlider type={"sofa"} />
            </Col>
          </Row>
        </Container>
      </div>

      < Footer />

    </div >
  )
}

export default Home
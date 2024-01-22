import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
import carticon from '../Components/Assets/carticon.png'
import user from '../Components/Assets/user.png'
import applogo from '../Components/Assets/logo.png'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Card } from 'react-bootstrap'
import wishlisticon from '../Components/Assets/wishlisticon.png'


import { v4 as uuidv4 } from 'uuid'


const Navbar = () => {
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
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
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

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login')
    })
  }

  

  const [cartdata, setcartdata] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `Cart-${loggeduser[0].uid}`

      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id })
        });
        setcartdata(cartArray)
      }).catch('Error Error Error')
    }
    getcartdata()
  }

  const [wishlistdata, setwishlistdata] = useState([]);
  if (loggeduser) {
    const getwishlistdata = async () => {
      const wishlistArray = [];
      const path = `Wishlist-${loggeduser[0].uid}`

      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          wishlistArray.push({ ...doc.data(), id: doc.id })
        });
        setwishlistdata(wishlistArray)
      }).catch('Error Error Error')
    }
    getwishlistdata()
  
  }
 

  return (
    <div>

      <div className='navbar'>
        <div className='LeftContainer'>
          <img src={applogo} alt='' />
        </div>

        <div className='RightContainer'>
          {!loggeduser &&
            <nav>
              <Link to='/'><button>Home</button></Link>
              <Link to='/categories'><button>Categories</button></Link>
              <Link to='/aboutus'><button>About Us</button></Link>
              <Link to='/signup'><button>Register</button></Link>
              <Link to='/login'><button>Login</button></Link>

              <div className='cart-btn'>
                <img src={carticon} alt="no img" />
                <span className='cart-icon-css'>0</span>
              </div>

              <div className='wishlist-btn'>
                <img src={wishlisticon} alt="no img"/> 
                <span className='wishlist-icon-css' style={{color: 'white'}}>0</span>

              </div>

              
           
            
            </nav>

          }

          {loggeduser &&
            <nav>
              <Link to='/'><button>Home</button></Link>
              <Link to='/categories'><button>Categories</button></Link>
              <Link to='/aboutus'><button>About Us</button></Link>

              <div className='cart-btn'>
                <Link to='/cartdata'><img src={carticon} alt="no img" /></Link>
                <button className='cart-icon-css'>{cartdata.length}</button>
              </div>

              <div className='wishlist-btn'>
              <Link to='/wishlist'> <img src={wishlisticon} alt="no img" /> </Link>
                <button className='wishlist-icon-css'>{wishlistdata.length}</button>

              </div>

              

              <span className='namedisplay'>Welcome {loggeduser[0].username}</span>
              <Link to="/userprofile">
                <img src={user} alt='' className='profile-icon' />
              </Link>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>

            </nav>
          }

        </div>

      </div>

   

    </div>

  )
}

export default Navbar
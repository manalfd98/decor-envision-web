import './Cart.css'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { doc, getDoc, addDoc } from "firebase/firestore";
import Specificproductpage from './ProductComponents/Specificproductpage'
import WishlistCard from './WishlistCard'

const Wishlist = (product) => {
    let p2 =product.price;
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
       
      <Navbar />

      {wishlistdata.length !=0 ? <div>
        <div className='cart-head'>Wishlist 
        </div>
        <div className='allcartitems'>
          {wishlistdata.map((item)=>(
            <WishlistCard key={item.id} itemdata={item} userid={loggeduser[0].uid} {...item} />
          ))}
          

        </div>

        {/* <div className='proceed'>
        <Link to='/checkout'><button
      >Proceed to Checkout</button></Link>
          
        </div> */}

      </div> 
      : <h4>Your Wishlist product are successfull added to cart
      
      </h4>}
    </div>
  )

}

export default Wishlist

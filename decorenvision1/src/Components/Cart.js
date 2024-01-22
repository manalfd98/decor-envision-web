import './Cart.css'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import CartCard from './CartCard'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { doc, getDoc, addDoc } from "firebase/firestore";
import Specificproductpage from './ProductComponents/Specificproductpage'


const Cart = (product) => {
  let p2 = product.price;
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

  // get the number of quantity
  const qty = cartdata.map(cartdata => {
    return cartdata.qty;
  })
  // console.log(quantity);
  const reducequantity = (accumulator, currentValue) => accumulator + currentValue;
  const totalqty = qty.reduce(reducequantity, 0);
  let totalqty1 = parseInt(totalqty)
  // console.log(totalqty);

  // get the number of total price
  const price = cartdata.map(cartdata => {
    return cartdata.product.price * cartdata.qty
  })
  const reduceprice = (accumulator, currentValue) => accumulator + currentValue;
  const totalprice = price.reduce(reduceprice, 0);
  //  console.log(totalprice);
  return (
    <div>
      <Navbar />
      {cartdata.length != 0 ? <div>
        <div className='cart-head'>Your Cart Items</div>
        <div className='allcartitems'>
          {cartdata.map((item) => (
            <CartCard key={item.id} itemdata={item} userid={loggeduser[0].uid} {...item}/>
          ))}
          <div className='total'>
            <div>
              <h4>Cart Summary</h4>
              <div> Total No of Items: <span>{totalqty1}</span></div>
              <div> Total Amount: <span>{totalprice}</span></div>
            </div>
          </div>

        </div>

        <div className='proceed'>
          <Link to={`/checkout/${loggeduser[0].uid}`}><button
          >Proceed To Checkout</button></Link>
        

        <div className='continue'>
          <Link to='/home'><button
          >Continue Shopping</button></Link>
        </div>
        </div>

      </div>

        : <p>
          Your cart is empty
        </p>}
    </div>
  )
}


export default Cart



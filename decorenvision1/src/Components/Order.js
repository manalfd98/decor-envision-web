import React, { useEffect, useState, Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './Order.css'
import CartCard from './CartCard'
import CheckOut from './CheckOut'
import { db } from '../FirebaseConfig/FirebaseConfig'
import { addDoc, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig/FirebaseConfig'
import { useParams } from 'react-router-dom';


const Order = () => {

    const [orderdate, setorder] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { orderId } = useParams()
    const [product, setProduct] = useState('');
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
    
    const [orderdata, setorderdata] = useState([]);
    if (loggeduser) {
        const getorderdata = async () => {
            const orderArray = [];
            const path = `Order-${loggeduser[0].uid}`

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id })
                });
                setorderdata(orderArray)
            }).catch('Error Error Error')
        }
        getorderdata()

    }
    
    const name = orderdata.map(orderdata => {
        return orderdata.Name;
      })

      const email = orderdata.map(orderdata => {
        return orderdata.Email;
      })

      const phonenumber = orderdata.map(orderdata => {
        return orderdata.phonenumber;
      })

      const orderid = orderdata.map(orderdata => {
        return orderdata.OrderID;
      })

      const fulladdress = orderdata.map(orderdata => {
        return orderdata.fulladdress;
      })
      const shipping = orderdata.map(orderdata => {
        return orderdata.DeliveryMethod;
      })
      const payment = orderdata.map(orderdata => {
        return orderdata.PaymentMethod;
      })

      const amount = orderdata.map(orderdata => {
        return orderdata.TotalAmount;
      })
      const date = orderdata.map(orderdata => {
        return orderdata.Date;
      })

    return (
      
        <div>
            <Navbar />
            {orderdata.length != 0 ?<div>
                <h1 className='thanku'>Thank You,Your order has been placed!</h1>
            <div className="heading">
                <h1>Order Summary</h1>
            </div>

            <div className='order-page'>
                <div className="order-container">
                    <div className='orderid'>
                        <h5>Order ID : {orderid} </h5>
                        <br></br>
                        <h5>Order Placed on : {date}  </h5>
                        <br></br>

                        <div className='orderplaced-by'>
                            <h6>Name:{name}  </h6>
                            <h6>Email:{email}</h6>
                            <h6>Contact No:{phonenumber}</h6>
                            <h6>Address: {fulladdress}</h6>

                            <br></br>
                            <h6>Shipping:{shipping} </h6>
                            <h6>Payment: {payment}</h6>
                            <br></br>
                            <h6>Total Amount with Delivery charges:{amount} </h6>
                        </div>



                    </div>



                </div>

        <br></br>
        <Footer />
    </div>
            </div>
            : <p>
          Your order summary is empty
        </p>}
        </div>
        

        
    )
}

export default Order
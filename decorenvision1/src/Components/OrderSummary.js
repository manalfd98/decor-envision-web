import React, { useEffect, useState, Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './OrderSummary.css'
import CartCard from './CartCard'
import CheckOut from './CheckOut'
import { db } from '../FirebaseConfig/FirebaseConfig'
import { addDoc, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig/FirebaseConfig'
import { useParams } from 'react-router-dom';
import order from '../Components/Assets/order.png'


const OrderSummary = () => {

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

    useEffect(() => {
      if (loggeduser) {
        const uid=loggeduser[0].uid
        const fetchData = async () => {
          const ordersCollectionRef =  collection(db, "Orders")
          const q = query(ordersCollectionRef, where("uid", "==", uid));
  
          try {
            const querySnapshot = await getDocs(q);
  
            const orders = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
  
            setorderdata(orders);
            console.log(orders)
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        };
  
        fetchData();
      }
    }, [loggeduser]);
    
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
      const date1 = orderdata.map(orderdata => {
        return orderdata.Date1;
      })

  return (

    <div>
      <Navbar />
      {orderdata.length != 0 ? <div>
        <div className="heading">
          <h1>Order Summary</h1>
        </div>
        <img src={order} alt="no img" style={{width:'200px', height:'200px',display: 'block', marginLeft: 'auto',marginRight: 'auto'}}/>
        <h1 className='thanku' style={{display: 'block', marginLeft: 'auto',marginRight: 'auto'}}>Thank You,Your order has been placed!</h1>

        <div className='order-page'>
          <div className="order-container">
            <div className='orderid'>
              <h4>Order ID : {orderid.length > 0 && orderid[0]} </h4>
              <br></br>
              <h5>Order Placed on : {date1.length > 0 && date1[0]}  </h5>
              <br></br>

              <div className='orderplaced-by'>
           
                <h6>Name: {name.length > 0 && name[0]}  </h6>
                <h6>Email: {email.length > 0 && email[0]}</h6>
                <h6>Contact No: {phonenumber.length > 0 && phonenumber[0]}</h6>
                <h6>Address: {fulladdress.length > 0 && fulladdress[0]}</h6>

                <br></br>
                <h6>Shipping Type: {shipping.length > 0 && shipping[0]} </h6>
                <h6>Payment Type: {payment.length > 0 && payment[0]}</h6>
                <br></br>
                <h6>Total Amount with Delivery charges: Rs {amount.length > 0 && amount[0]} </h6>
              </div>
            </div>

          </div>
          
        

          <Link to='/home'><button type="button" className="btn-back"  >Back to Home Page</button></Link>
          <br></br>

        </div>
      </div>
        : <p>
          Your order summary is empty
        </p>}
      <Footer />
    </div>



  )
}

export default OrderSummary
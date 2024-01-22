import React, { useState, useEffect } from 'react';
import { auth, db } from '../FirebaseConfig/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from './Navbar';
import './userprofile.css';
import Modal from 'react-bootstrap/Modal';


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for the modal
  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (userlogged) => {
        if (userlogged) {
          const q = query(collection(db, 'users'), where('uid', '==', userlogged.uid));
          const data = await getDocs(q);
          setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]);
        } else {
          setUser(null);
        }
      });
    };

    const fetchOrders = async () => {
      if (user) {
        const ordersCollectionRef = collection(db, 'Orders');
        const userOrdersQuery = query(ordersCollectionRef, where('uid', '==', user.uid));

        try {
          const querySnapshot = await getDocs(userOrdersQuery);
          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUserOrders(orders);
          console.log(orders);
        } catch (error) {
          console.error('Error fetching user orders:', error);
        }
      }
    };

    fetchUserData();
    fetchOrders();
  }, [user]);
  const handleViewCart = (order) => {
    setSelectedOrder(order);
    handleShow();
  };

  return (
    <div>
      <Navbar />
      <div className='sidebaruser'>
        <a href='/userprofile'><button className='sidebaruser-1'>My Profile</button></a><br />
        <a href='/myorders'><button className='sidebaruser-2'>My Orders</button></a><br />

      </div>
<h3 style={{ marginBottom: '20px',marginTop:'20px' }}>My Profile</h3>
      <div className="userprofile-outercontainer">
        
        {user ? (
          <div className="user-profile">


            <center>
              <p>My Account Details</p>
            </center>

            <div className="data-row">
              <span>Name: </span>
              <span>{user.username}</span>
            </div>
            <div className="data-row">
              <span>Email: </span>
              <span>{user.email}</span>
            </div>
            <div className="data-row">
              <span>Address: </span>
              <span>{user.fulladdress}</span>
            </div>
            <div className="data-row">
              <span>Phone Number: </span>
              <span>{user.phonenumber}</span>
            </div>


          </div>
        ) : (
          <div>You Are Not Logged In</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
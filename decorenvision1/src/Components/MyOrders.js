import React, { useState, useEffect } from 'react';
import { auth, db } from '../FirebaseConfig/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './userprofile.css';
import Modal from 'react-bootstrap/Modal';
import Navbar from './Navbar';
import { Table } from 'react-bootstrap';


const MyOrders = () => {
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
        setShow(true);
    };

    const cartItems = selectedOrder?.cartItems || selectedOrder?.cartitems || [];



    return (
        <div>
            <Navbar />
            <div className='sidebaruser'>
                <a href='/userprofile'><button className='sidebaruser-1'>My Profile</button></a><br />
                <a href='/myorders'><button className='sidebaruser-2'>My Orders</button></a><br />

            </div>
            <div className='container'>
                <div className="order-list-container">
                    <h3 style={{ marginBottom: '20px' }}>My Orders</h3>

                    {userOrders.length === 0 ? (

                        <p>No orders found.</p>
                    ) : (
                        <Table striped bordered hover size="sm" >
                            <thead>
                                <tr>
                                    <th>OrderID</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {userOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.OrderID}</td>
                                        <td>Rs {order.TotalPrice}</td>
                                        <td>{order.Status}</td>
                                        <td>{order.Date1}</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={() => handleViewCart(order)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                </div>

                <div>


                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>My Items</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {cartItems.length > 0 ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td><img src={item.product.productimage} alt="" width="50" height="50" /></td>
                                            <td>{item.product.producttitle}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No cart items found for this Order.</p>
                        )}
                    </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-primary' onClick={handleClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </div>
        </div >
    )
}

export default MyOrders
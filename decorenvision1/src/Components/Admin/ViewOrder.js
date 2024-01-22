import React from 'react'
import { useEffect, useState, Component } from 'react'
import AdminNavbar from './AdminNavbar'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { addDoc, collection, query, where, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore';
import { auth } from '../../FirebaseConfig/FirebaseConfig'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'
import './ViewOrder.css'
import Form from 'react-bootstrap/Form';



const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [isDelivered, setIsDelivered] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'Orders', id));
        if (orderDoc.exists()) {
          const orderData = { id: orderDoc.id, ...orderDoc.data() };
          setOrder(orderData);
          setIsDelivered(orderData.Status === 'Delivered');
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);
  const handleUpdateStatus = async () => {
    try {
      await updateDoc(doc(db, 'Orders', id), { Status: 'Delivered' });
      console.log(`Order with ID ${id} marked as Delivered.`);
      setOrder((prevOrder) => ({ ...prevOrder, Status: 'Delivered' }));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
const cartItems=order.cartItems|| order.cartitems||[];
  return (
    <div>
      <AdminNavbar />
      <div className='container'>
        <h3>Order Details</h3>
        <p className='order-p'> OrderID: {order.OrderID}</p>
        <p className='order-p1'>Name: {order.Name}</p>
        <p className='order-p1'>Date: {order.Date1}</p>
        <p className='order-p1'>Address: {order.fulladdress}</p>
        <p className='order-p1'>Total Amount: Rs {order.TotalAmount}</p>
        <p className='order-p1'>Total Quantity: {order.TotalQty}</p>
        <p className='order-p1'>Status: {order.Status}</p>
        <label class="checkboxcont">Mark as Delivered:
          <input type="checkbox"  checked={isDelivered} onChange={handleUpdateStatus} ></input>
            <span class="checkmark" ></span>
        </label>

        <h4>Cart Items: </h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.product.productimage} alt="" width="50" height="50" /></td>
                  <td>{item.product.producttitle}</td>
                  <td>{item.qty}</td>
                  <td>{item.product.price}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* Render other order details */}
    </div>
  );
};

export default ViewOrder;
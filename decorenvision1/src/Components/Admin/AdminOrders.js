import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orderdata, setOrderData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const validMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const fetchData = async () => {
      const ordersCollectionRef = collection(db, "Orders");
      const q = query(ordersCollectionRef);

      try {
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrderData(orders);
        setFilteredOrders(orders);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const deleteOrder = async (orderID) => {
    const orderRef = doc(db, 'Orders', orderID);

    try {
      await deleteDoc(orderRef);
      console.log(`Order with ID ${orderID} deleted successfully.`);
      // Update both state variables after successful deletion
      setOrderData((prevOrders) => prevOrders.filter((order) => order.id !== orderID));
      setFilteredOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderID));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleFilterChange = () => {
    let filtered = orderdata;

    if (selectedYear) {
      filtered = filtered.filter(orders => new Date(orders.Date1).getFullYear() === parseInt(selectedYear));
    }

    if (selectedMonth && validMonths.includes(selectedMonth)) {
      const monthNumeric = validMonths.indexOf(selectedMonth) + 1;
      filtered = filtered.filter(orders => new Date(orders.Date1).getMonth() + 1 === monthNumeric);
    }

    setFilteredOrders(filtered);
  };


  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <h3>All Orders</h3>

        <label className="filter-label">
          <h4>Filter by Year:</h4>
          <input className="filter-input"
            type="text"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="Enter Year"
          />
        </label>

        <label className="filter-label1">
          <h4>Filter by Month:</h4>
          <input className="filter-input"
            type="text"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            placeholder="Enter Month"
          />
        </label>

        <button className="btn-filter" onClick={handleFilterChange}>Filter</button>

        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Total Quantity</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.Name}</td>
                  <td>{order.Email}</td>
                  <td>{order.fulladdress}</td>
                  <td>{order.TotalPrice}</td>
                  <td>{order.TotalQty}</td>
                  <td>{order.Date1}</td>
                  <td>{order.Status}</td>
                  <td><button className='btn-delete' onClick={() => { deleteOrder(order.id) }}>Delete</button></td>
                  <td><Link to={`/ViewOrder/${order.id}`}><button className='btn-edit1' >View Order</button></Link></td>

                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
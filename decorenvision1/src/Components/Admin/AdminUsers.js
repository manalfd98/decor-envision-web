import { React, useState } from 'react'
import useGetUser from './useGetUser'
import AdminNavbar from './AdminNavbar'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const AdminUsers = () => {
  const navigate = useNavigate();

  const { data: usersData } = useGetUser('users')
  

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'users', id))
    toast.success("Deleted");
  }

  

  return (
    <div>
      <AdminNavbar />

      <div className='container'>
        <h3>All Users</h3>
        <div className='allusers'>
          <br />
        </div>

        <div className='table-container'>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                usersData.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.username}
                    </td>
                    <td>{item.email}</td>
                    <td>{item.fulladdress}</td>
                    <td>{item.phonenumber}</td>
                    <td>
                      <td><button className='btn-delete' onClick={() => { deleteProduct(item.id) }}>Delete</button>
                      <Link to={`/UpdateUser/${item.id}`}><button className='btn-edit' >Update</button></Link></td>                 
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

        </div>
      </div>


    </div>

  )
}

export default AdminUsers
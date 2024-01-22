import React from 'react'
import useGetUser from './useGetUser'
import AdminNavbar from './AdminNavbar'
import Table from 'react-bootstrap/Table';
import { db } from '../../FirebaseConfig/FirebaseConfig'
import { getDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { addDoc, updateDoc, query, where, getDocs, } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './UpdateUser.css'

const UpdateUser = () => {
  const { type, id } = useParams()
  const [user, setUser] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [phonenumber, setphonenumber] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };
    getUser();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'users', id);
      const updatedUser = {
        username: name || user.username,
        email: email || user.email,
        address: address || user.address,
        phonenumber: phonenumber || user.phonenumber,
      };

      await updateDoc(docRef, updatedUser);
      setSuccessMsg('User details updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMsg('An error occurred while updating user details');
    }
  };



  return (

    <div>
      <AdminNavbar />
      <div>
        <div className='edituser-container'>
          <form className='edituser-form'>
            {successMsg && <div className='success-msg'>{successMsg}</div>}
            {errorMsg && <div className='error-msg'>{errorMsg}</div>}

            <h1>Update User</h1>
            <label>Name</label>
            <input
              type='text'
              value={name || user.username}
              onChange={(e) => setname(e.target.value)}
              placeholder='Name'
            />

            <label>Email</label>
            <input
              type='text'
              value={email || user.email}
              onChange={(e) => setemail(e.target.value)}
              placeholder='Email'
            />

            <label>Address</label>
            <input
              type='text'
              value={address || user.address}
              onChange={(e) => setaddress(e.target.value)}
              placeholder='Address'
            />

            <label>Phone Number</label>
            <input
              type='text'
              value={phonenumber || user.phonenumber}
              onChange={(e) => setphonenumber(e.target.value)}
              placeholder='Phone Number'
            />

            <button type='submit' onClick={handleEdit}>
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default UpdateUser
import AdminNavbar from './AdminNavbar'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../FirebaseConfig/FirebaseConfig' 
import { collection, getDocs, query, where} from 'firebase/firestore'
import './AdminProfile.css'

const AdminProfile = () => {
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
      if (loggeduser) {
        console.log(loggeduser[0].email)
      }
      return (
        <div >
          <AdminNavbar />
          <div className='userprofile-outercontainer '>
            {loggeduser ? <div className='user-profile'>
              <center><p>Your Account Details</p></center>
    
              <div className='data-row'>
                <span>Name: </span>
                <span>{loggeduser[0].username}</span>
    
              </div>
              <div className='data-row'>
                <span>Email: </span>
                <span>{loggeduser[0].email}</span>
    
              </div>
              <div className='data-row'>
                <span>Address: </span>
                <span>{loggeduser[0].address}</span>
    
              </div>
              <div className='data-row'>
                <span>Phone Number: </span>
                <span>{loggeduser[0].phonenumber}</span>
    
              </div>
            </div> : <div>
              You Are Not Logged In
    
            </div>}
    
          </div>
        </div>
      )
    }
 

export default AdminProfile
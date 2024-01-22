import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import applogo from '../Assets/logo.png'
import adminuser from '../Assets/adminuser.png'
import '../Admin/AdminNavbar.css'
import { auth, db } from '../../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'



const AdminNavbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login')
        })
    }

    return (
        <div>
            <div className='admin-navbar'>
                <div className='right-container'>
                    <img src={applogo} alt='' />
                </div>

                <div className='left-container'>
                    <span>Welcome Admin</span>
                    <Link to="/adminprofile">
                        <img src={adminuser} alt='' className='user-icon' />
                    </Link>
                    <button className='logout-button' onClick={handleLogout}>Logout</button>


                </div>
            </div>

           <br />
           <br />
           <br />

           <div className='sidebar'>
                <a href='/admin/dashboard'><button className='sidebar-1'>Dashboard</button></a><br />
                <a href='/adminallproducts'><button className='sidebar-2'>Products</button></a><br />
                <a href='/adminorders'><button className='sidebar-3'>Orders</button></a><br />
                <a href='/adminusers'><button className='sidebar-4'>Users</button></a>
            </div>

            {/* <div className='dashboard'>
                <a href='/admin/dashboard'><button>Dashboard</button></a>
                <a href='/adminallproducts'><button>All Products</button></a>
                <a href='/adminorders'><button>Orders</button></a>
                <a href='/adminusers'><button>Users</button></a>
            </div> */}

            
                    

                


            

        </div>
    )
}

export default AdminNavbar
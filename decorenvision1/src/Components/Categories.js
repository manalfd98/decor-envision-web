import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import './Categories.css'
import { UserCard } from 'react-ui-cards';
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Footer from './Footer'
import Banner from './Banner'

const Categories = () => {
  return (
    <div>
      <Navbar />
      <br></br>
      <div className="heading">
        <h1>Explore Categories</h1>
      </div>
      <div className='category-page'>
      <div className="category-container">
        <a  href='/product-type/sofa'>
          <img src='https://cassoni.com/image/catalog/Rugiano/cas-rug-pierre-sofa-01/cas-rug-pierre-sofa-01-img01.jpg'
           alt=''></img></a>
          <div className="category-detail">
            
              <button className="category-title">Sofa</button>
  
        </div>
     </div>
     <div className="category-container">
     <a href='/product-type/table'>
          <img src='https://images-na.ssl-images-amazon.com/images/I/A19fLofzmZL._AC_SL1500_.jpg'
         alt=''></img></a>
          <div className="category-detail">
           
              <button className="category-title">Table</button>
     
        </div>
     </div>
     <div className="category-container">
     <a href='/product-type/chair'>
          <img src='https://tse4.mm.bing.net/th?id=OIP.wowxz0GxbfRS_WYyPpp6AAHaHa&pid=Api&P=0&h=180'
          alt=''></img></a>
          <div className="category-detail">
           
              <button className="category-title">Chair</button>
       
        </div>
     </div>
         <div className="category-container">
        <a href='/product-type/bed'>
          <img src='https://i5.walmartimages.com/asr/09dada36-c518-4d59-8f11-38e4b9f8c930_1.06ebcd4a28bc86aa07e3bc994ca6a716.jpeg'
          alt=''></img></a>
          <div className="category-detail">

              <button className="category-title">Bed</button>
      
        </div>
     </div>

    </div>
    <Footer />
    </div>
 
  )
}

export default Categories
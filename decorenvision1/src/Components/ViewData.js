import React, { useState, useEffect } from 'react';
import { db } from '../FirebaseConfig/FirebaseConfig'
import { addDoc, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { auth } from '../FirebaseConfig/FirebaseConfig'
import { useParams } from 'react-router-dom';
import '../Components/CustomizeReq.css'


const ViewData = (itemdata) => {

    return (
        <div className='cusreq-container'>

            <form className='cusreq-form'>


                <h4>{itemdata.product.producttitle}</h4>
                <h6>Height: {itemdata.newheight}</h6>
                <h6>Width: {itemdata.newwidth}</h6>
                <h6>Length: {itemdata.newlength}</h6>
                <h6>Color: {itemdata.newcolor}</h6>
                <h6>Description: {itemdata.description}</h6>





            </form>
        </div>


    )
}

export default ViewData
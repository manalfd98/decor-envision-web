import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { db } from '../FirebaseConfig/FirebaseConfig';
import './CartCard.css'
import deletebtn from '../Components/Assets/deletebtn.png'
import { auth } from '../FirebaseConfig/FirebaseConfig';
import React, { useEffect, useState } from 'react'
import { getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore"

const WishCard = (props) => {
    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    let p = props.itemdata.product.price
       let mrp = parseInt(p)
      const saleprice = (mrp) * prodquantity

    const deletecartitem = async () => {
        await deleteDoc(doc(db, `Wishlist-${props.userid}`, `${props.itemdata.id}`))
        .then(() => { console.log('doc deleted') })
    }
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
                setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
              };
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
       const addtocart = () => {
        if (props.itemdata.product) {
            console.log(loggeduser[0].uid)
            addDoc(collection(db, `Cart-${loggeduser[0].uid}`), {
                product:props.itemdata.product, qty: 1
            }).then(() => {
                deleteDoc(doc(db, `Wishlist-${props.userid}`, `${props.itemdata.id}`))
                .then(() => { setSuccessMsg('Product added to cart'); })

            }).catch((error) => { setErrorMsg(error.message) });
        }
        else {
            setErrorMsg('Your item is already in cart')
        }

    }


    return (
        
        <div className='cart-prod-container'>
            {successMsg && <><div className='success-msg'>{successMsg}</div>
                        </>}
                        {errorMsg && <>
                            <div className='error-msg'>{errorMsg}</div>
                        </>}
            <div className='cart-prod-imgtitle'>
                <div className='prod-image'><img src={props.itemdata.product.productimage} alt='' /> 
                </div>
                <div className='prod-title'>
                    <h4>{props.itemdata.product.producttitle} </h4>
                    <p className='customize-text'>Rs {props.itemdata.product.price}</p>
                    <button className='btn-cart'onClick={addtocart}> Add To Cart </button>
                </div>
            </div>
            
            <button className='deletebtn' onClick={deletecartitem}>
                <img src={deletebtn} alt='' />
            </button>

        </div>
        
        
        
    )
}

export default WishCard


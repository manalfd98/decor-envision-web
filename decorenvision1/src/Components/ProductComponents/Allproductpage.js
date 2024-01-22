import React ,{ useState,useEffect } from 'react';
import Navbar from '../Navbar';
import './Allproductpage.css';
import Productcontainer from './Productcontainer';
import { collection,query,onSnapshot,getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/FirebaseConfig';

const Allproductpage = (props) => {
    const [product ,setProduct]=useState([]);
    useEffect(()=>{
        const getproduct=()=>{
            const productArray=[];
            const path=`product-${props.type.toUpperCase()}`;
            // console.log(path);
            getDocs(collection(db,path)).then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    productArray.push({...doc.data(),id:doc.id})
                    // console.log(doc.id,"=>",doc.data());
                })
                setProduct(productArray)
            }).catch((error)=>{
                console.log(error.message)
            });



        }
        getproduct();

    
    },[])

  return (
    <div className="allproductpage">
        <Navbar/>
        <div className="heading">
            <h1>Top Result for {props.type}</h1>

        </div>
        <div className="allproductcontainer">
            
            {product.map((product)=>(

                <Productcontainer
                key={product.id}
                product={product}
                
                />
            ))}


        </div>

   
    </div>
  )  
 }

export default Allproductpage
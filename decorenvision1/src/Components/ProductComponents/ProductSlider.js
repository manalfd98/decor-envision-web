import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sliderproductcard from './Sliderproductcard';
import { collection,query,onSnapshot,getDocs, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../FirebaseConfig/FirebaseConfig';

const ProductSlider = (props) => {
  const responsive = {
    sofa: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    bed: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    chair: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    table: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  
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
    <div>
        <Carousel responsive={responsive}>
            {product.map((product)=>
            (<Sliderproductcard key={product.id} product={product}/>)
            )}
  
</Carousel>;
    </div>
  )
}

export default ProductSlider 
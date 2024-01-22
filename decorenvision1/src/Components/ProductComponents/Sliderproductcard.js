import React from 'react'

import './Sliderproductcard.css'
import { Link } from 'react-router-dom';
const Sliderproductcard = (product) =>{ 
  let p =product.product
  let overalltax=10/100;
  let overcommisiion=10/100;
  let extraforfun=10/100;
  let mrp= parseInt(product.product.price);
  //mrp=mrp+ overalltax*mrp + overcommisiion*mrp + extraforfun*mrp;
  //const salesprice=mrp-extraforfun*mrp;

  return (
    <div class="mini-product-container">
        <div className='mini-image-container'>
            <img src={p.productimage} />
        </div>

        <div className='mini-product-details'>
            <p className='mini-producttitle'>{p.producttitle}</p>

            <div className="mini-price-container">
                <p className="mrp"><p className="rate">Rs {mrp}</p></p>
                
            </div>
            <Link to ={`/product/${p.producttype}/${p.id}`}>
              <button className='showmore-btn'>Show more &gt;</button>
              </Link>
            
        </div>

    </div>
  )
}

export default Sliderproductcard
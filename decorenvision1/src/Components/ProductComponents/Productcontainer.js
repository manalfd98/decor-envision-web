import React from 'react'
import './Productcontainer.css'
import { Link } from 'react-router-dom';
const Productcontainer = (product) => {
    let p = product.product

    let overalltax = 10 / 100;
    let overcommisiion = 10 / 100;
    let extraforfun = 10 / 100;
    let mrp = parseInt(p.price);
    //mrp = mrp + overalltax * mrp + overcommisiion * mrp + extraforfun * mrp;
    //const salesprice = mrp - extraforfun * mrp;



    return (
        <div className="product-container">
            <img src={p.productimage}></img>
            <div className="product-detail">
                <a href={`/product/${p.producttype}/${p.id}`}>
                    <button className="product-title">{p.producttitle}</button>
                </a>
                <div className="price-container">
                    <p className='mrp'><p className='rate'>Rs {mrp}</p></p>
                    
                </div>
                <Link to={`/product/${p.producttype}/${p.id}`}>
                    <button className='showmore-btn'>More Details &gt;</button>

                </Link>
            </div>

        </div>
        


        // <div>{props.product.productTitle}</div>
    )
}

export default Productcontainer
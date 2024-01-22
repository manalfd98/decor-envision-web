import Navbar from './Navbar'
import React, { useEffect, useState, Component } from 'react'
import { Route } from 'react-router-dom'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Footer from './Footer'
import Cart from './Cart'
import CartCard from './CartCard'

const Shipping = (product) => {

    let p2 = product.price;
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

    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
            }).catch('Error Error Error')
        }
        getcartdata()

    }

    // get the number of quantity
    const quantity = cartdata.map(cartdata => {
        return cartdata.quantity;
    })
    // console.log(quantity);
    const reducequantity = (accumulator, currentValue) => accumulator + currentValue;
    const totalqty = quantity.reduce(reducequantity, 0);
    let totalqty1 = parseInt(totalqty)
    // console.log(totalqty);

    // get the number of total price
    const price = cartdata.map(cartdata => {
        return cartdata.product.price * cartdata.quantity
    })
    const reduceprice = (accumulator, currentValue) => accumulator + currentValue;
    const totalprice = price.reduce(reduceprice, 0);
    //  console.log(totalprice);


    //delivery charges
    const [selectedOption, setSelectedOption] = useState('');
    const [buttonActivated, setButtonActivated] = useState(false);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        setButtonActivated(event.target.value = ! '');

    };
    const handleButtonClick = () => {
        // Perform your desired action when the button is clicked with the required option selected
        console.log('Button clicked with the required option selected:', selectedOption);
    };

    let deliverycharges = 0;

    switch (selectedOption) {
        case 'standard':
            deliverycharges = 500;
            break;
        case 'exclusive':
            deliverycharges = 1000;
            break;

    }

    const totalamount = totalprice + deliverycharges;

    return (
        <div>
            {/* <Navbar />

            <div className="heading">
                <h1>Shipping Option</h1>
            </div> */}

            <div className='category1-page'>
                <div className="category1-container">

                    <input type="radio" className="radio" id="standard" name="select" value="standard" checked={selectedOption === 'standard'}
                        onChange={handleRadioChange}

                    />
                    <label for="standard">
                        <div className="category1-detail">
                            <h3>Standard Delivery</h3>
                            <p>Order will be deliver within 20-25 days.
                                Charges will be Rs.500.
                            </p>
                        </div>
                    </label>
                </div>
                <div className="category1-container">
                    <input type="radio" className="radio" id="exclusive" name="select" value="exclusive" checked={selectedOption === 'exclusive'}
                        onChange={handleRadioChange}
                    />
                    <label for="exclusive">
                        <div className="category1-detail">
                            <h3>Exclusive Delivery</h3>
                            <p>Order will be deliver within 10-15 days.
                                Charges will be Rs.1000</p>
                        </div>
                    </label>
                </div>




                {cartdata.length != 0 ? <div>
                    <div className='allcartitems-container'>

                        <div className='total'>
                            <div>
                                <h4>Payment Summary</h4>
                                <br></br>
                                <div> Total no of products: <span>  {totalqty1}</span></div>
                                <div> Total sum of products: <span>Rs.  {totalprice}</span></div>
                                <div> Shipping Changes: <span>Rs.  {deliverycharges}</span></div>
                                <br></br>
                                <div>Total Amount: <span>Rs.  {totalamount}</span></div>


                            </div>
                        </div>

                    </div>


                    {/* <div className='proceed'>
                        <span><Link to='/checkout'><button
                        >Back</button></Link></span>
                        <span><Link to='/payment'><button onClick={handleButtonClick} disabled={!buttonActivated}
                        >Proceed to Payment</button></Link></span>

                    </div> */}
                    <br></br>
                </div>
                    : <p>
                        Your cart is empty
                    </p>}


            </div>
            <br />
            <br />

            {/* <Footer /> */}

        </div>


    )
}

export default Shipping
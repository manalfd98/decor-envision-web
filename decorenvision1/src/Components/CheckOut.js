import './CheckOut.css'
import React, { useEffect, useState, Component } from 'react'
import Navbar from './Navbar'
import './CheckOut.css'
import { Route } from 'react-router-dom'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { updateProfile } from 'firebase/auth'
import { collection, getDocs, query, where, deleteDoc, setDoc, addDoc, doc, updateDoc } from 'firebase/firestore'
import CartCard from './CartCard'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Shipping from './Shipping'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Payment from './Payment'

const CheckOut = () => {

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderCounter, setOrderCounter] = useState(1);
  const [info, setinfo] = useState('');

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
  // if (loggeduser) {
  //   console.log(loggeduser[0].email)
  // }
  const [cartdata, setcartdata] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `Cart-${loggeduser[0].uid}`

      getDocs(collection(db, path)).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id })
        });
        setcartdata(cartArray)
      }).catch('Error Error Error')
    }
    getcartdata()

  }


  const navigate = useNavigate()
  const [fulladdress, setfulladdress] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [state, setstate] = useState('')
  const [city, setcity] = useState('')
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-8); // Extract last 8 digits of current timestamp
    return `${timestamp}-${orderCounter}`;
  };

  const orderId = generateOrderId();
  console.log('Order placed with ID:', orderId);

  // get the number of quantity
  const qty = cartdata.map(cartdata => {
    return cartdata.qty;
  })
  // console.log(quantity);
  const reducequantity = (accumulator, currentValue) => accumulator + currentValue;
  const totalqty = qty.reduce(reducequantity, 0);
  let totalqty1 = parseInt(totalqty)
  // console.log(totalqty);

  // get the number of total price
  const price = cartdata.map(cartdata => {
    return cartdata.product.price * cartdata.qty
  })
  const reduceprice = (accumulator, currentValue) => accumulator + currentValue;
  const totalprice = price.reduce(reduceprice, 0);
  //delivery charges
  const [shipping, setSelectedOption] = useState('');
  const [buttonActivated, setButtonActivated] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    setButtonActivated(event.target.value = ! '');

  };
  let deliverycharges = 0;

  switch (shipping) {
    case 'standard':
      deliverycharges = 500;
      break;
    case 'exclusive':
      deliverycharges = 1000;
      break;

  }

  const totalamount = totalprice + deliverycharges;

  //payment

  const [payment, setSelectedOption2] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');


  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the Mastercard payment processing here
    // You can call your API or perform the necessary actions
    // to process the payment using the collected card information
    console.log('Processing Mastercard payment...');
  };

  const [buttonActivated2, setButtonActivated2] = useState(false);


  const handleRadioChange2 = (event) => {
    setSelectedOption2(event.target.value);
    setButtonActivated2(event.target.value = ! '');

  };

  // const handleButtonClick = (event) => {
  //   // Perform your desired action when the button is clicked with the required option selected
  //   AddInfo(event);
  //   // Place the order with the generated order ID
  //   // Increment the order counter for the next order
  //   //setOrderCounter(orderCounter + 1);

  // };
  const handleCombinedClick = async (event) => {
    event.preventDefault();
    if (fulladdress && city && zipcode && shipping && payment) {
      try {
        await AddInfo(event);
        // If the form submission is successful, clear error message and set success message
        setErrorMsg('');
        setSuccessMsg('Information has been saved successfully!');
      } catch (error) {
        // If there's an error during form submission, set error message
        setErrorMsg('An error occurred. Please try again.');
      }
    } else {
      // If any required field is missing, show an error or alert
      setErrorMsg('Please fill in all the required fields.');
    }
  };


  const AddInfo = async (event) => {
    event.preventDefault();
    const cartCollectionRef = collection(db, `Cart-${loggeduser[0].uid}`);

    if (loggeduser) {
      const uid = loggeduser[0].uid;

      // Reference to the "Orders" collection for the user
      const basicInfoCollectionRef = collection(db, 'Orders');
      const currentDateTime = new Date().toDateString();

      // Check if an order already exists for the user
      const q = query(basicInfoCollectionRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If an order exists, update it
        const existingOrderDoc = querySnapshot.docs[0];
        await setDoc(existingOrderDoc.ref, {
          Name: loggeduser[0].username,
          Email: loggeduser[0].email,
          uid: uid,
          fulladdress: fulladdress,
          phonenumber: loggeduser[0].phonenumber,
          zipcode: zipcode,
          Status: "Pending",
          city: city,
          OrderID: orderId,
          TotalPrice: totalprice,
          TotalQty: totalqty,
          DeliveryMethod: shipping,
          TotalAmount: totalamount,
          PaymentMethod: payment,
          Date1: currentDateTime,
          cartitems: cartdata,
        });

        setSuccessMsg('Information has been updated successfully!');
      } else {
        // If no order exists, create a new one
        const infoData = {
          Name: loggeduser[0].username,
          Email: loggeduser[0].email,
          uid: uid,
          fulladdress: fulladdress,
          phonenumber: loggeduser[0].phonenumber,
          zipcode: zipcode,
          Status: "Pending",
          city: city,
          OrderID: orderId,
          TotalPrice: totalprice,
          TotalQty: totalqty,
          DeliveryMethod: shipping,
          TotalAmount: totalamount,
          PaymentMethod: payment,
          Date1: currentDateTime,
          cartitems: cartdata,
        };

        await addDoc(basicInfoCollectionRef, infoData);
        setSuccessMsg('Information has been saved successfully!');
      }

      // Delete all documents within the "cart" collection
      const docsToDelete = await getDocs(cartCollectionRef);
      docsToDelete.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } else {
      setErrorMsg('Sorry, please try again.');
    }
  };



  return (
    <div>
      <Navbar />
      <div>

        <div className="py-3 ">
          <div className="Container">
            <h6>Checkout Details</h6>
          </div>

        </div>
      </div>
      {loggeduser &&
        <div className="py-2">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Full Name</label>
                          <input type="text" className='form-control'
                            value={loggeduser[0].username} required
                            disabled />
                        </div>

                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Email Address</label>
                          <input type="email" className='form-control'
                            value={loggeduser[0].email} required
                            disabled />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Phone Number</label>
                          <input type="text" name="phone" className="form-control" required pattern="[0-9]{4}[0-9]{7}" value={loggeduser[0].phonenumber}>
                          </input>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label>Full Address</label>
                          <textarea rows="3" className="form-control" value={fulladdress} onChange={(e) => setfulladdress(e.target.value)} >
                          </textarea>

                        </div>

                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label> City</label>
                          <input type="text" name="city" className="form-control" onChange={(e) => setcity(e.target.value)} value={city} required>
                          </input>

                        </div>


                      </div>

                      <div className="col-md-4">

                        <div className="form-group mb-3">
                          <label> Zip Code</label>
                          <input type="text" name="zipcode" className="form-control" value={zipcode} onChange={(e) => setzipcode(e.target.value)} required>
                          </input>
                        </div>

                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-0 ">
                          <Link to='/cart'><button type="button" className="back" >Back</button></Link>
                        </div>

                      </div>

                      <div className="col-md-12">
                        <div className="form-group mb-0">
                          <button type="button" className="btn-confirm" onClick={handleCombinedClick} >Confirm Order</button>


                        </div>

                      </div>

                    </div>

                  </div>

                </div>
                <div className="col-md-12">
                  <div className="form-group mb-0"></div>
                  <Link to={`/Ordersummary/${orderId}`}>
                    <button type="button" className="btn-order"  >View Order Summary</button></Link>
                </div>
                {successMsg && (
                  <div className='success-msg'>{successMsg}</div>
                )}
                {errorMsg && (
                  <div className='error-msg'>{errorMsg}</div>
                )}





              </div>

              <div className="col-md-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th wiidth="50%">Product</th>
                      <th>Price</th>
                      <th>Product Type</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartdata.map(item => (
                        <tr key={item.id}>
                          <td>
                            {item.product.producttitle}
                          </td>
                          <td>{item.product.price}</td>
                          <td>{item.product.producttype}</td>
                          <td>{item.qty}</td>

                        </tr>
                      ))

                    }


                  </tbody>
                  <br />
                  <div>
                    <h5>Total no of items: {totalqty}</h5>
                    <h5>Total Amount: Rs {totalprice}</h5>
                    <br />

                    <h5>Select Shipping Method</h5>
                    <div className='shipping-page'>

                      <div className="shipping-container">

                        <input type="radio" className="radio1" id="standard" name="select" value="standard" checked={shipping === 'standard'}
                          onChange={handleRadioChange}

                        />
                        <label for="standard">
                          <div className="shipping-detail">
                            <h5 style={{ marginLeft: '10px' }}>Standard Delivery</h5>
                            <p style={{ marginLeft: "10px" }}>Order will be deliver within 20-25 days.
                              Charges will be Rs.500.
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="shipping-container">
                        <input type="radio" className="radio1" id="exclusive" name="select" value="exclusive" checked={shipping === 'exclusive'}
                          onChange={handleRadioChange}
                        />
                        <label for="exclusive">
                          <div className="shipping-detail">
                            <h5 style={{ marginLeft: '10px' }}>Exclusive Delivery</h5>
                            <p style={{ marginLeft: "10px" }}>Order will be deliver within 10-15 days.
                              Charges will be Rs.1000</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <br />
                    <h5>Select Payment Method</h5>

                    <div className='category2-page'>
                      <div className="category2-container">
                        <input type="radio" className="radio2" id="cashondelivery" name="select1"
                          value="cashondelivery" checked={payment === 'cashondelivery'}
                          onChange={handleRadioChange2}
                        />
                        <label for="cash on delivery">
                          <div className="category2-detail">
                            <h5 >Cash on Delivery</h5>
                            <p>Pay on your door step</p>

                          </div>
                        </label>
                      </div>



                      {/* <div className="category2-container">
                        <input type="radio" className="radio2" id="mastercard" name="select1"
                          value="mastercard" checked={payment === 'mastercard'}
                          onChange={handleRadioChange2}
                        />
                        <label for="mastercard">
                          <div className="category2-detail">
                            <h5>MasterCard</h5>
                            <p>Please enter your Credit Card/Debit Card Details</p>
                          </div>
                        </label>
                      </div>
                      {payment === 'mastercard' && (
                        <form onSubmit={handleSubmit} className='card-form'>
                          <div>
                            <label>
                              Card Number:
                              <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder='xxxx xxxx xxxx xxxx' required />
                            </label>
                          </div>
                          <div>
                            <label>
                              Expiry Date:
                              <input type="text" value={expiryDate} onChange={handleExpiryDateChange} placeholder='MM/YY' required />
                            </label>
                          </div>
                          <div>
                            <label>
                              CVV:
                              <input type="text" value={cvv} onChange={handleCvvChange}  placeholder='xxx' required />
                            </label>
                          </div>
                          <button type="submit">Pay with Mastercard</button>
                        </form>
                      )} */}





                    </div>







                  </div>


                </table>


              </div>

            </div>
          </div>

        </div>
      }
    </div>

  )
}

export default CheckOut
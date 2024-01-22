import React, { useEffect, useState, Component } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Payment = () => {
    const [selectedOption, setSelectedOption] = useState('');
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

    const [buttonActivated, setButtonActivated] = useState(false);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        setButtonActivated(event.target.value = ! '');

    };
    const handleButtonClick = () => {
        // Perform your desired action when the button is clicked with the required option selected
        console.log('Button clicked with the required option selected:', selectedOption);
    };



    return (
        <div>
            {/* <Navbar />
            <div className="heading">
                <h1>Payment Option</h1>
            </div> */}

            <div className='category2-page'>
                <div className="category2-container">
                    <input type="radio" className="radio" id="cashondelivery" name="select"
                        value="cashondelivery" checked={selectedOption === 'cashondelivery'}
                        onChange={handleRadioChange}
                    />
                    <label for="cash on delivery">
                        <div className="category1-detail">
                            <h3 style={{marginLeft:'10px'}}>Cash on Delivery</h3>

                        </div>
                    </label>
                </div>
                <div className="category2-container">
                    <input type="radio" className="radio" id="mastercard" name="select"
                        value="mastercard" checked={selectedOption === 'mastercard'}
                        onChange={handleRadioChange}
                    />
                    <label for="mastercard">
                        <div className="category1-detail">
                            <h3 style={{marginLeft:'10px'}}>MasterCard</h3>
                        </div>
                    </label>
                </div>
                {selectedOption === 'mastercard' && (
                    <form onSubmit={handleSubmit} className='card-form'>
                        <div>
                            <label>
                                Card Number:
                                <input type="text" value={cardNumber} onChange={handleCardNumberChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                Expiry Date:
                                <input type="text" value={expiryDate} onChange={handleExpiryDateChange} required />
                            </label>
                        </div>
                        <div>
                            <label>
                                CVV:
                                <input type="text" value={cvv} onChange={handleCvvChange} required />
                            </label>
                        </div>
                        <button type="submit">Pay with Mastercard</button>
                    </form>
                )}





            </div>
            {/* <div className='proceed'>
                <span><Link to='/shipping'><button
                >Back</button></Link></span>
                <span><Link to='/order'><button onClick={handleButtonClick} disabled={!buttonActivated}
                >Proceed</button></Link></span>

            </div> */}
            <br></br>








            {/* <Footer /> */}
        </div>
    );
};

export default Payment


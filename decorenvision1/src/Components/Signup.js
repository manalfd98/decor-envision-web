import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../FirebaseConfig/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import './Signup.css'
import { v4 as uuidv4 } from 'uuid'
import { GoogleAuthProvider } from 'firebase/auth'


const Signup = () => {
  const userId = uuidv4();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [fulladdress, setAddress] = useState("");

  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [error, setError] = useState(false)

  // const provider = new GoogleAuthProvider();

  // const signupGoogle = async () => {
  //   await signInWithPopup(auth, provider);
  //   navigate('/home')

  // }
  // const [user, setUser] = useState(null);

  // const signupGoogle = () => {
  //   signInWithPopup(auth, provider).then((result) => {
  //     const user = result.user;
  //     console.log("user >>>", user)
  //     setUser(user)
  //   }).catch((error) => {
  //     alert(errorMsg)
  //   });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCrediential) => {
        const user = userCrediential.user;
        const initialcartvalue = 0;
        console.log(user);

        addDoc(collection(db, "users"), {
          username: username, email: email, phonenumber: phonenumber, password: password,
          fulladdress: fulladdress, cart: initialcartvalue, uid: user.uid
        }).then(() => {
          setSuccessMsg('New User Added Successfully')
          setUserName('')
          setPhoneNumber('')
          setEmail('')
          setPassword('')
          setErrorMsg('')
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/login');
          }, 4000);
        })
          .catch((error) => { setErrorMsg(error.message) });
      })
      .catch((error) => {
        const pass_pattern = [0 - 9]
        if (error.message == 'FireBase: Error (auth/invalid-email).') {
          setErrorMsg('Please fill all required fields')
        }
        if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
          setErrorMsg('User Already exists')
        }
      })
    if (username.length == 0 || email.length == 0 || password.length == 0 || phonenumber.length == 0 || fulladdress.length == 0) {
      setError(true)
    }


  }
  return (
    <div className='main-div'>
      <Navbar />
      <div className='background'>
        <div className='signup-container'>
          <form className='signup-form' onSubmit={handleSubmit}>
            <h1>Create Account</h1>

            {successMsg && <>
              <div className='success-msg'>
                {successMsg}</div>
            </>}

            {errorMsg && <>
              <div className='error-msg'>
                {errorMsg}</div>
            </>}

            <label>Name</label>
            <input onChange={(e) => setUserName(e.target.value)}
              type='text' placeholder='Your Full Name' required pattern="[A-Z]{1}[a-z]{2,15} [A-Z]{1}[a-z]{2,15}" />
            {error && username.length <= 0 ?
              <h5> Please Fill This Fields</h5> : ""}

            <label>Mobile Number</label>
            <input onChange={(e) => setPhoneNumber(e.target.value)}
              type='tel' placeholder='Your Mobile Number' required pattern="[0-9]{4}[0-9]{7}" />
            {error && phonenumber.length <= 0 ?
              <h5> Please Fill This Fields</h5> : ""}

            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)}
              type='email' placeholder='Enter your email' required pattern=".+@gmail\.com" />
            {error && email.length <= 0 ?
              <h5> Please Fill This Fields</h5> : ""}

            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)}
              type='password' placeholder='Enter your password' required minlength="8" />
            {error && password.length <= 0 ?
              <h5> Please Fill This Fields</h5> : ""}

            <label>Address</label>
            <input onChange={(e) => setAddress(e.target.value)}
              type='text' placeholder='Enter your address' required minlength="15" />
            {error && fulladdress.length <= 0 ?
              <h5>Please Fill This Fields</h5> : ""}

            <button type='submit'>Sign Up</button>
            {/* <button onClick={signupGoogle} type='submit'>Sign Up with Google</button> */}


            <div className='signin'>
              <span>Already have an account?</span>
              <Link to='/login' >Sign In</Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Signup
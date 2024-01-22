import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [error, setError] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCrediential) => {
        setSuccessMsg('Login Successfully')
        setEmail('')
        setPassword('')
        setErrorMsg('')
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/home');
          if (email == "newadmin@gmail.com") {
            navigate('/admin')
          }
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (error.message == 'FireBase: Error (auth/invalid-email).') {
          setErrorMsg('invalid user')
        }
        if (error.message == 'Firebase: Error (auth/user-not-found).') {
          setErrorMsg('User not Found')
        }
        if (error.message == 'Firebase: Error (auth/wrong-password).') {
          setErrorMsg('Invalid Password')
        }
        if (email == 0 || password == 0) {
          setError('Please fill all required fields')
        }

      });

  }




  return (
    <div>

      <Navbar />
      <div className='background'>
        <div className='login-container'>
          <form className='login-form'>
            <h1>Login</h1>

            {successMsg && <>
              <div className='success-msg'>
                {successMsg}</div>
            </>}

            {errorMsg && <>
              <div className='error-msg'>
                {errorMsg}</div>
            </>}

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
            <button onClick={handleLogin}>Login</button>
            <div className='account'>
              <span>Don't have an account?</span>
              <Link to='/signup'>Sign Up</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
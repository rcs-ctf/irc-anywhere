import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import reactLogo from '../assets/react.svg'
import '../App.css'
import 'react-toastify/dist/ReactToastify.css';

const rot13 = (message) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
  return message.replace(/[a-z]/gi, letter => alpha[alpha.indexOf(letter) + 13]);
}

function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', username)
    console.log('Password:', password)
    console.log('Form submitted')

    // Encode the password
    let encodedPassword = rot13(password);
    console.log('Encoded password:', encodedPassword);
    // encode again to base64
    encodedPassword = btoa(encodedPassword);

    let data = JSON.stringify({
        "username": {
            "$eq": username
        },
        "password": {
            "$eq": encodedPassword
        }
    });
    
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios.request(config)
        .then((response) => {
            console.log(response.data[0].token);
            if (response.data.length > 0) {
                toast.success('Login Successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                });
            } else {
                toast.error('Login Failed!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error('Login Failed!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
            });
        }); 
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Login Portal</h1>
      <div className="login-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
      </div>
      <p className="read-the-docs">
        Registrations are closed. Please read the docs for more info.
      </p>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default Home

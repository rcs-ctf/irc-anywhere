import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import '../App.css'
import 'react-toastify/dist/ReactToastify.css';

const rot13 = (message) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLM';
    return message.replace(/[a-z]/gi, letter => alpha[alpha.indexOf(letter) + 13]);
}

function Home() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let token = localStorage.getItem('token');
    let token_user = localStorage.getItem('user');

    const handleSubmit = (event) => {
        event.preventDefault()
        // Encode the password
        let encodedPassword = rot13(password);
        // encode again to base64
        encodedPassword = btoa(encodedPassword);
        console.log('Encoded password:', encodedPassword);

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
                if (response.data.length > 0) {
                    token = response.data[0].token;
                    token_user = response.data[0].username;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', token_user);
                    toast.success('Login Successful!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                    });
                    setTimeout(() => {
                        window.location.href = '/app';
                    }, 3000);
                } else {
                    toast.error('Login Failed!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        draggable: true,
                    });
                }
            })
            .catch(() => {
                toast.error('Login Failed!', {
                    position: "bottom-right",
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
            <img src="/irc-anywhere.png" className="logo react" alt="React logo" />
        </div>
        <h1>Login Portal</h1>
        <div className="login-card">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <div className="form-el-container">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-el-container">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
            </div>
            <div className="form-control">
                <div className="form-el-container">
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-el-container">
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                />
                </div>
            </div>
            <button className="btn" type="submit">
                Sign In
            </button>
            </form>
        </div>
        <p className="read-the-docs">
            Registrations are closed. Read more from <a href="/notice">here</a>.
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

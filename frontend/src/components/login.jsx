import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let user = {
            email,
            password
        }
        const { data: token } = await axios.post('http://127.0.0.1:8000/login/', user);
        localStorage.setItem('token', token.token)
        setInterval(()=> {
        navigate('/dashboard');

        },1000)
    }
    return (
        <div>
            <div className='loginContainer'>
                <div className="loginHead">
                    <p>Login Form</p>
                </div>
                <div className="loginBody">
                    <div className="inputs">
                        <label htmlFor="email">Email Address</label>
                        <input type='email' placeholder="Enter Email Address" id="email" autoFocus onChange={(e) => setEmail(e.target.value)} /><br />

                        <label htmlFor="password">Password</label>
                        <input type='password' placeholder="Enter Password" id="password" onChange={(e) => setPassword(e.target.value)} />

                        <button onClick={handleLogin}>Login</button>
                        <p><span>Not a User ? </span><Link to="/signup">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

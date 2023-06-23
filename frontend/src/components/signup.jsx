import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSignup = async(e) => {
        e.preventDefault();
        let user={
            email:email,
            password:password,
            confirm_password:password
        }
        await axios.post('http://127.0.0.1:8000/signup/',user)
      
    }
    return (
        <div>
            <div className='signupContainer'>
                <div className="signupHead">
                    <p>Signup Form</p>
                </div>
                <div className="signupBody">
                    <div className="inputs">
                        <label htmlFor="email">Email Address</label>
                        <input type='email' placeholder="Enter Email Address" id="email" autoFocus onChange={(e)=>setEmail(e.target.value)}/><br />

                        <label htmlFor="password">Password</label>
                        <input type='password' placeholder="Enter Password" id="password" onChange={(e)=>setPassword(e.target.value)}/>

                        <button onClick={handleSignup}>Register</button>
                        <p><span>Already User ? </span><Link to="/">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
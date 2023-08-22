import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link } from 'react-router-dom';


export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();
    
    const submitForm = (e) => {
        e.preventDefault();
        if (email && password) {
            const allEntries = JSON.parse(localStorage.getItem('entries')) || [];
            if(allEntries.length > 0) {
                for(let i=0; i<allEntries.length; i++) {
                    if(allEntries[i].email === email && allEntries[i].password === password) {
                        alert('Login successful');
                        console.log(allEntries[i]);
                        navigation(`/feed/${allEntries[i].id}`);
                        console.log(allEntries[i].id)
                        return;
                    }
                    else if(allEntries[i].email === email && allEntries[i].password !== password) {
                        alert('Incorrect password');
                        navigation('/');
                        setPassword('');
                        return;
                    }
                    else
                    {
                      alert('Email does not exist');
                      navigation('/signUp');
                    }
                }
            }
            else if(allEntries.length === 0){
                alert('Email does not exist');
                navigation('/signUp');
            }
          
            setEmail('');
            setPassword('');
        }
        else {
            alert('Please fill the data');
        }
    }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div>
        <h2 className="text-center">Sign In</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/signup" className="btn btn-link">Sign Up</Link>
        </div>
        <form action='' onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control mt-2" id="email" placeholder="Enter email" autoComplete='off' style={{ width: '300px' }} value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control mt-2" id="password" placeholder="Password" style={{ width: '300px' }} value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

import React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
// import SignIn from './signIn';
import { v4 as uuidv4 } from 'uuid';


export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const navigation = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
      
        if (name && email && password) {
          const newUserId = uuidv4();
          setUserId(newUserId);
          console.log('Yeh Id ha:' + newUserId);
          const newEntry = { id: newUserId, name: name, email: email, password: password };
          let allEntries = JSON.parse(localStorage.getItem('entries')) || [];

          if (allEntries.length > 0) {
            for (let i = 0; i < allEntries.length; i++) {
              if (allEntries[i].email === email) {
                alert('Email already exists');
                navigation('/');
                return;
              }
            }
          }
      
          allEntries.push(newEntry); 
          localStorage.setItem('entries', JSON.stringify(allEntries));
          console.log(localStorage.getItem('entries')); 
          console.log(allEntries);
          // setUserId(newId);
          alert('You have signed up successfully');
          navigation(`/feed/${newUserId}`);
          setName('');
          setEmail('');
          setPassword('');
        } 
        else 
        {
          alert('Please fill in all the fields');
        }
      };
      

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      {/* <Link to={`/createPost?userId=${newId}`}>Create Post</Link> */}
      <div  style={{ border:'2px solid white', padding: '33px', borderRadius:'10px', boxShadow:'4px 4px 10px 3px grey' }}>
        <h2>Sign Up</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/" className="btn btn-link">Sign In</Link>
        </div>
        <form action='' onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control mt-2" id="name" placeholder="Enter name" style={{ width: '300px' }} value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control mt-2" id="email" placeholder="Enter email" autoComplete='off' style={{ width: '300px' }} value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control mt-2" id="password" placeholder="Password" style={{ width: '300px' }} value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div className='d-flex align-items-center justify-content-center mt-3'>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
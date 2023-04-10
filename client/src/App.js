import React, {useState, useEffect} from 'react';
import './App.css';

import axios from 'axios';

import LoginUser from './components/LoginUser'
import LoginAdmin from './components/LoginAdmin'
import InformationUser from './components/InformationUser'
import InformationAdmin from './components/InformationAdmin'

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function App() {
  const [isLoginUser, setIsLoginUser] = useState(false)
  const [isLoginAdmin, setIsLoginAdmin] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if(token) {
        const userVerified = await axios.get('/users/verify', {
          headers: {Authorization: token}
        })
        console.log(userVerified);
        setIsLoginUser(userVerified.data)
        if(userVerified.data === false) return localStorage.clear()

      }else {
        setIsLoginUser(false)
      }
    }
    checkLogin()
  }, [])

  useEffect(() => {
    const checkLoginAdmin = async () => {
      const token = localStorage.getItem('tokenStore')
      if(token) {
        const adminVerified = await axios.get('/users/verifyAdmin', {
          headers: {Authorization: token}
        })
        console.log(adminVerified);
        setIsLoginAdmin(adminVerified.data)
        if(adminVerified.data === false) return localStorage.clear()

      }else {
        setIsLoginAdmin(false)
      }
    }
    checkLoginAdmin()
  }, [])


  return (
    <div>
      {
        isLoginUser 
        ? <InformationUser setIsLoginUser={setIsLoginUser}/>
        : <LoginUser setIsLoginUser={setIsLoginUser}/>
      }
        
    </div>
  
    
  );
}

export default App;

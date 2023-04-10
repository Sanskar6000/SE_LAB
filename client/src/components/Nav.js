import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import './css/Nav.css'

export default function Nav({setIsLoginUser}) {

  const logoutSubmit = () => {
    localStorage.clear()
    setIsLoginUser(false)
  }

  const [info, setInfo] = useState([])
  const [token, setToken] = useState('')

  const getInfo = async(token) =>{
    const res = await axios.get('/api/info/yourSubmissions', {
      headers:{Authorization: token}
    })
    console.log(res);
    setInfo(res.data)
  }

  useEffect(() =>{
    const token = localStorage.getItem('tokenstore')
    setToken(token)
    console.log(token);
    if(token) {
      getInfo(token)
    }
  }, [])

    // Header Effect
    useEffect(() => {
      const navbarLinksList = document.querySelectorAll('.navbar .navbar-link');
      const navbarUnderscore = document.querySelector(
        '.navbar .navbar-underscore'
      );
      const activeNavLinkClassName = 'active';
  
      navbarLinksList.forEach((navLink) => {
        if (navLink.classList.contains(activeNavLinkClassName)) {
          showNavbarUnderscore(navLink);
        }
  
        navLink.addEventListener('click', function () {
          for (let navLink of navbarLinksList) {
            if (navLink.classList.contains(activeNavLinkClassName)) {
              navLink.classList.remove(activeNavLinkClassName);
              break;
            }
          }
  
          this.classList.add(activeNavLinkClassName);
          showNavbarUnderscore(this);
        });
      });
  
      function showNavbarUnderscore(navLink) {
        navbarUnderscore.style.width = `${navLink.offsetWidth}px`;
        navbarUnderscore.style.transform = `translateX(${navLink.offsetLeft}px)`;
  
        if (navbarUnderscore.style.display !== 'block') {
          navbarUnderscore.style.display = 'block';
        }
      }
    }, []);

    if(info.length !== 0 && (info[0].name).localeCompare('admin') === 0) {
      return (
        <div className="navbar">
          <ul className="navbar-list">
          <li className="navbar-item">
              <Link to="/" className="navbar-link active">
                <div className="bi navbar-link-icon">Drug Trafficking Reporting System</div>
              </Link>
            </li>
          <li className="navbar-item">
         
            <Link to="/" className='navbar-link'>
              <div className="bi navbar-link-icon"> System Engineer Dashboard</div>
            </Link>
                
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link active">
                <div className="bi navbar-link-icon">Submissions</div>
              </Link>
            </li>
    
            <li className="navbar-item" onClick={logoutSubmit}>
              <Link to="/" className="navbar-link">
                <i className="bi bi-box-arrow-right navbar-link-icon"></i>
              </Link>
            </li>
    
            <div className="navbar-underscore"></div>
          </ul>
        </div>
      )
    }
    else {
      return (
        <div className="navbar">
          <ul className="navbar-list">
          <li className="navbar-item">
              <Link to="/" className="navbar-link active">
                <div className="bi navbar-link-icon">Drug Trafficking Reporting System</div>
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/" className="navbar-link active">
                <div className="bi navbar-link-icon">Your Submissions</div>
              </Link>
            </li>
    
            <li className="navbar-item">
              <Link to="/create" className="navbar-link">
                <div className="navbar-link-icon">Report Drug Trafficking</div>
              </Link>
            </li>
    
    
            <li className="navbar-item" onClick={logoutSubmit}>
              <Link to="/" className="navbar-link">
                <i className="bi bi-box-arrow-right navbar-link-icon"></i>
              </Link>
            </li>
    
            <div className="navbar-underscore"></div>
          </ul>
        </div>
      )
    }  
  
}

import React from 'react'
import Header from './Nav'
import Home from './Home'
import CreateInfo from './CreateInfo'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

export default function InformationUser({setIsLoginUser}) {
  return (
    <Router>
      <div className='information-page'>
        <Header setIsLoginUser={setIsLoginUser}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<CreateInfo/>} />
        </Routes>
      </div>
    </Router>
  )
}

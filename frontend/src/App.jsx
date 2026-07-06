import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import Instructorver from './components/Instructorver'

const App = () => {
  return (
    <Router>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-instructor" element={<Instructorver />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
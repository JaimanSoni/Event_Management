import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

// Pages and Components 
import MainPage from './Pages/UserDashboard/MainPage'

import UserLogin from './Pages/OpenSourcePages/UserLogin';
import UserSignup from './Pages/OpenSourcePages/UserSignup';

import EventDashboard from './Pages/UserDashboard/EventDashboard';
import CreateEvent from './Pages/UserDashboard/CreateEvent';

import ManageProfile from './Pages/UserDashboard/ManageProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/event/:id" element={<EventDashboard />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/profile" element={<ManageProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

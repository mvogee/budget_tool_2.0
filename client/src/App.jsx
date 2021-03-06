import './App.css';
import './styles/common.css';
import {React, useState, useEffect} from 'react';

import Budgets from './routes/Budgets.jsx';
import CreateAcc from './routes/CreateAcc.jsx';
import Income from './routes/Income.jsx';
import LandingPage from './routes/LandingPage.jsx';
import Login from './routes/Login.jsx';
import Overview from './routes/Overview.jsx';
import ThisMonth from './routes/ThisMonth.jsx';
import Profile from './routes/Profile.jsx';

import GuestNav from './components/GuestNav.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

import checkAuth from "./checkAuth.js";

import {Routes, Route} from "react-router-dom";

function App() {
    const [user, setUser] = useState(null); 

    useEffect(() => {checkAuth(setUser)}, []);

    function putNav(username) {
      console.log(username);
        return (username ? <Nav userName={user.username} setUser={setUser}/> : <GuestNav /> );
    }

  return (
    <div className="App">
    {putNav(user ? user.username : null)}
    
      <Routes>
          <Route path="/overview" element={<Overview user={user} setUser={setUser} />} />
          <Route path="/income" element={<Income user={user} setUser={setUser} />} />
          <Route path="/budgets" element={<Budgets user={user} setUser={setUser} />} />
          <Route path="/thisMonth" element={<ThisMonth user={user} setUser={setUser} />} />
          <Route path="/landingPage" element={<LandingPage user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/createAcc" element={<CreateAcc user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
  
      <Footer />
    </div>
  );
}

export default App;

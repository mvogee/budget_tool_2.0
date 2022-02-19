import './App.css';

import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Budgets from './routes/Budgets.jsx';
import CreateAcc from './routes/CreateAcc.jsx';
import Income from './routes/Income.jsx';
import LandingPage from './routes/LandingPage.jsx';
import Login from './routes/Login.jsx';
import Overview from './routes/Overview.jsx';
import ThisMonth from './routes/ThisMonth.jsx';
import Profile from './routes/Profile.jsx';

import {Routes, Route, Link} from "react-router-dom"; // check if you even need this if its going to be in Nav.jsx



function App() {
  return (
    <div className="App">
      <Nav userName="Mvogee" /> { /* username will be changed out with the users name */}
      <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/income" element={<Income />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/thisMonth" element={<ThisMonth />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAcc" element={<CreateAcc />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

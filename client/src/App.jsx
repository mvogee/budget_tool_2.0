import './App.css';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Nav userName="Mvogee" /> { /* username will be changed out with the users name */}
      </header>
      <Footer />
    </div>
  );
}

export default App;

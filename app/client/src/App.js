import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Explore from './pages/Explore'
import Saved from './pages/Saved'
import Profile from './pages/Profile';
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/edit" element={<Account/>} />
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;

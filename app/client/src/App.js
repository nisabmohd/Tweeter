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
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { baseurl } from './apicalls'
import Signup from './pages/Signup';
import Specificpost from './pages/Specificpost';

function App() {
  const [uid, setUid] = useState(null)
  const [username, setUsername] = useState("")
  const [userimg, setUserimg] = useState("")
  async function login(email, password) {
    if (email && password) {
      const data = { email: email, password: password };
      fetch(`${baseurl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('auth', JSON.stringify(data))
          setUid(data.uid)
          setUserimg(data.userimg)
          setUsername(data.username)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUid(JSON.parse(localStorage.getItem('auth')).uid)
      setUserimg(JSON.parse(localStorage.getItem('auth')).userimg)
      setUsername(JSON.parse(localStorage.getItem('auth')).username)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        {
          uid ? (
            <>
              <Navbar auth={uid} username={username} userimg={userimg} />
              <Routes>
                <Route path="/" element={<Home uid={uid} userimg={userimg}></Home>} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<Saved uid={uid} />} />
                <Route path="/profile" element={<Profile uid={uid} />} />
                <Route path="/edit" element={<Account height="75vh" btntext="Save" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/post/:postid" element={<Specificpost/>} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<Login login={login} />} />
              </Routes>
            </>
          )
        }


      </div>
    </BrowserRouter>

  );
}

export default App;

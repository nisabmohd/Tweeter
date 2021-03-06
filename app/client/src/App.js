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
import Account from './pages/Account';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { baseurl } from './apicalls'
import Signup from './pages/Signup';
import Specificpost from './pages/Specificpost';
import Specificuser from './pages/Specificuser';
import BottomNav from './components/BottomNav';
import toast, { Toaster } from 'react-hot-toast';
import Specifichashtag from './pages/Specifichashtag';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material/styles';


function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
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
          toast.error('Error logging in', {
            duration: 2000,
            style: {
              fontFamily: 'Poppins',
              fontSize: '11px'
            },
          });
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
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUid(JSON.parse(localStorage.getItem('auth')).uid)
      setUserimg(JSON.parse(localStorage.getItem('auth')).userimg)
      setUsername(JSON.parse(localStorage.getItem('auth')).username)
    }
  }, [uid])

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          {
            uid ? (
              <>
                <Toaster />
                <Navbar auth={uid} username={username} userimg={userimg} />
                <BottomNav auth={uid} username={username} userimg={userimg} />
                <Routes>
                  <Route path="/" element={<Home uid={uid} userimg={userimg}></Home>} />
                  <Route path="/explore" element={<Explore uid={uid} />} />
                  <Route path="/saved" element={<Saved uid={uid} />} />
                  <Route path="/search/:hashtag" element={<Specifichashtag />} />
                  <Route path="/edit" element={<Account setuid={setUid} height="75vh" btntext="Save" passwordtxt="Change Password" htext="Edit profile" />} />
                  <Route path="/post/:postid" element={<Specificpost />} />
                  <Route path="/user/:uid" element={<Specificuser uid={uid} />} />
                </Routes>
              </>
            ) : (
              <>
                <Routes>
                  <Route path="/signup" element={<Signup setuid={setUid} />} />
                  <Route path="/*" element={<Login login={login} />} />
                </Routes>
              </>
            )
          }


        </div>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;

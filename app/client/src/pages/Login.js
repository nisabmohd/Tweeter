import { TextField } from '@mui/material'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import bg from '../assets/Tweetstorm.svg'
import logo from'../assets/image.png'


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const LoginPage = () => {
        if (email === "") {
            toast.error('Enter Email');
            return
        }
        if (password === "") {
            toast.error('Enter Password');
            return
        }
        props.login(email, password)
    }
    return (
        <div className='loginpage' style={{ height: '85vh', display: 'flex', width: '100%', backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', justifyContent: 'space-around', alignItems: 'center', margin: 'auto' }}>
            <Toaster />
            <div className="loginsection" style={{ backgroundColor: 'rgb(33 35 36)', display: 'flex', flexDirection: 'column', padding: '19px', paddingBottom: '22px', borderRadius: '9px', height: 'fit-content' }}>
                <div className="logo noselect" style={{ width: "100%", display: 'flex', flexDirection: 'row', height: '50%', alignItems: 'center',justifyContent:'center' }}>
                    <img src={logo} alt="" style={{ width: '46px', minWidth: '42px' }} />
                    <h2 style={{ color: 'white', fontFamily: 'Poppins', marginLeft: '7px' }}>Tweeter</h2>
                </div>
                <TextField
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="mail"
                    hiddenLabel
                    id="filled-hidden-label-small"
                    placeholder='Email'
                    variant="outlined"
                    inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                    size="small"
                    style=
                    {{ width: '340px', fontSize: '12.5px', marginTop: '3.5vh' }}
                />
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    hiddenLabel
                    id="filled-hidden-label-small"
                    placeholder='Password'
                    variant="outlined"
                    inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                    size="small"
                    style={{ width: '340px', fontSize: '12.5px', marginTop: '3vh' }}
                />
                <button onClick={(e) => { LoginPage() }} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '35px', width: '85px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', margin: 'auto', marginTop: '3vh', marginBottom: '1.2vh' }}>Login</button>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white', fontSize: '12px', margin: 'auto' }}>Don't have an account?</Link>
            </div>
        </div>
    )
}

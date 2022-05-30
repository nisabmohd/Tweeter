import { TextField } from '@mui/material'
import React, { useState } from 'react'
import svgico from '../assets/tweeter.svg'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const LoginPage = () => {
        if (email==="") {
            toast.error('Enter Email');
            return
        }
        if (password==="") {
            toast.error('Enter Password');
            return
        }
        props.login(email, password)
    }
    return (
        <div className='loginpage container' style={{ height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <Toaster />
            <div className="loginsection" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', margin: 'auto', padding: '19px', borderRadius: '9px' }}>
                <img style={{ width: '150px', margin: 'auto', marginTop: '1vh' }} src={svgico} alt="" />
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
                <button onClick={(e)=>{LoginPage()}} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '35px', width: '85px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', margin: 'auto', marginTop: '3vh', marginBottom: '1.2vh' }}>Login</button>
                <Link to="/signup" style={{textDecoration:'none',color:'inherit',fontSize:'12px',margin:'auto'}}>Don't have an account?</Link>
            </div>
        </div>
    )
}

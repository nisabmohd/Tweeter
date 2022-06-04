import React from 'react'
import logo from '../assets/tweeter.svg'
import '../App.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, NavLink } from "react-router-dom";
import { Menu, MenuItem } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';


function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };
    function logout() {
        localStorage.removeItem('auth');
        window.location.reload();
    }
    return (

        <div className='navbar' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '64px', backgroundColor: 'white' }}>
            <div className="logo" style={{ width: "30%" }}>
                <img src={logo} alt="" style={{ marginLeft: "2.5vw", width: '109px' }} />
            </div>
            <div className="tags navtags" >
                <NavLink to="/" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}>Home</NavLink>
                <NavLink to="/explore" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}>Explore</NavLink>
                <NavLink to="/saved" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}>Saved</NavLink>
            </div>
            <div className="user" style={{ width: "30%", display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img style={{ width: '32px', borderRadius: '9px', marginLeft: 'auto' }} src={JSON.parse(localStorage.getItem('auth')).userimg} alt="" />
                <p className='parahide' onClick={handleClick} style={{ color: '#828282', fontWeight: '600', marginLeft: '19px', fontSize: '12.5px', cursor: 'pointer' }}>
                    {
                        JSON.parse(localStorage.getItem('auth')).username
                    }
                </p>
                <ArrowDropDownIcon onClick={handleClick} style={{ marginRight: '2.5vw', marginLeft: "10px", marginBottom: '-2px', cursor: 'pointer' }} color="disabled" />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    style={{ borderRadius: '9px' }}
                >
                    <MenuItem onClick={handleClose} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><Link style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }} to="/profile"><AccountCircleIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} /> Profile</Link></MenuItem>
                    <MenuItem onClick={handleClose} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><Link style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }} to="/edit"><SettingsIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} /> My account</Link></MenuItem>
                    <MenuItem onClick={() => { handleClose(); logout() }} style={{ fontSize: '12px', fontFamily: 'Poppins' }} > <ExitToAppIcon color="error" style={{ width: '18px', height: '18px', marginRight: '10px' }} /> Logout</MenuItem>
                </Menu>
            </div>

        </div>
    )

}

export default Navbar
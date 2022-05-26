import React from 'react'
import logo from '../assets/tweeter.svg'
import '../App.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Navbar() {
    return (
        <div className='navbar' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '64px' ,backgroundColor:'white'}}>
            <div className="logo" style={{ width: "30%" }}>
                <img src={logo} alt="" style={{ marginLeft: "2.5vw",width:'109px' }} />
            </div>
            <div className="tags" style={{ width: "40%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <a href="/" className="tagstyle active">Home</a>
                <a href="/explore" className="tagstyle " >Explore</a>
                <a href="/bookmarks" className="tagstyle ">Bookmarks</a>
            </div>
            <div className="user" style={{ width: "30%",display:'flex',flexDirection:'row',alignItems:'center' }}>
                <img style={{width:'32px',borderRadius:'9px',marginLeft:'auto'}} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=72ccac23-f971-49c1-9c3b-ea67aecb38d6" alt="" />
                <p style={{color:'#828282',fontWeight:'600',marginLeft:'19px',fontSize:'12.5px'}}>Nisab</p>
                <ArrowDropDownIcon style={{marginRight:'2.5vw',marginLeft:"10px",marginBottom:'-2px',cursor:'pointer'}} color="disabled"/>
            </div>
        </div>
    )

}

export default Navbar
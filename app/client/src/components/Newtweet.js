import React from 'react'
import ImageIcon from '@mui/icons-material/Image';
export default function Newtweet() {
    return (
        <div className='newtweet' style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column' }}>
            <div className="header" style={{ borderBottom: '1px solid #E0E0E0',width:'96.25%',margin:'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px',marginBottom:'8px',fontSize:'12px', }}>Tweet Something</h6>
            </div>
            <div className="writetweet" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '9px' }}>
                <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2%' }} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=72ccac23-f971-49c1-9c3b-ea67aecb38d6" alt="" />
                <input type="text" style={{ height: '49px', width: '88%', marginLeft: '9px', outline: 'none', border: 'none', fontFamily: 'Poppins' }} placeholder="Whats's Happening" />
            </div>
            <div className="btns" style={{ marginTop: "15px",marginBottom:'15px',display:'flex',flexDirection:'row',alignItems:'center' }}>
                <div className="imgico" style={{marginLeft:'2%',display:'flex',flexDirection:'row',alignItems:'center',marginBottom:'-5px'}}>
                    <ImageIcon color="primary" style={{cursor:'pointer',width:'22px'}} />
                    <p style={{fontSize:'12px',marginLeft:"5px",color:'#828282'}}>Click to upload a picture</p>
                </div>
                <div className="btntweet" style={{ marginLeft: 'auto', width: 'fit-content', marginRight: '9px',}}>
                    <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '31px', width: '75px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px' }}>Tweet</button>
                </div>

            </div>
        </div>
    )
}

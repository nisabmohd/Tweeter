import React from 'react'
import SyncIcon from '@mui/icons-material/Sync';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
export default function Post(props) {
    return (
        <div className='post' style={{ marginBottom: '15px', padding: '12px', backgroundColor: 'white', borderRadius: '9px' }}>
            <div className="userheader">
                <div className="user" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
                    <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2%' }} src={props.userimg} alt="" />
                    <div className="timeuser" style={{ display: 'flex', flexDirection: 'column',}}>
                        <h6 style={{ fontSize: '12px', margin: '0', marginLeft: '12px',width:'fit-content' }}>{props.name}</h6>
                        <p style={{ fontSize: '9px', margin: '0',marginLeft:'12px' }}>{props.date}</p>
                    </div>
                </div>
            </div>
            <div className="captions">
                <p style={{ fontSize: '11.5px', marginLeft: '2%' }}>{props.caption}</p>
            </div>
            <div className="image">
                {
                    props.img?<img src={props.img} style={{ width: '95%', margin: 'auto', marginLeft: "2%", borderRadius: '9px' }} alt="" />:<></>
                }
            </div>
            <div className="benchmarks">

            </div>
            <div className="actionbuttons" style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'85%',margin:'auto'}}>
                <div className="comments" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <ChatBubbleOutlineIcon style={{ width: '18px' ,marginRight:'9px'}} />
                    <p style={{fontSize:'12px'}}>Comment</p>
                </div>
                <div className="retweet" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <SyncIcon style={{ width: '18px' ,marginRight:'9px'}} />
                    <p style={{fontSize:'12px'}}>Retweet</p>
                </div>
                <div className="likes" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <FavoriteBorderIcon style={{ width: '18px',marginRight:'9px' }} />
                    <p style={{fontSize:'12px'}}>Like</p>
                </div>
                <div className="save" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <BookmarkBorderIcon style={{ width: '18px',marginRight:'9px' }} />
                    <p style={{fontSize:'12px'}}>Save</p>
                </div>

            </div>
        </div>
    )
}

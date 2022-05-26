import React from 'react'
import SyncIcon from '@mui/icons-material/Sync';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
export default function Post() {
    return (
        <div className='post' style={{ marginTop: '15px', padding: '12px', backgroundColor: 'white', borderRadius: '9px' }}>
            <div className="userheader">
                <div className="user" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
                    <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2%' }} src="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=72ccac23-f971-49c1-9c3b-ea67aecb38d6" alt="" />
                    <div className="timeuser" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h6 style={{ fontSize: '12px', margin: '0', marginLeft: '12px' }}>Nisab Mohd</h6>
                        <p style={{ fontSize: '9px', margin: '0', marginLeft: '-6.5px' }}>21/04/2021</p>
                    </div>
                </div>
            </div>
            <div className="captions">
                <p style={{ fontSize: '11.5px', marginLeft: '2%' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam esse aperiam ipsa vitae nobis laborum quod sunt similique, facilis a.</p>
            </div>
            <div className="image">
                <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176" style={{ width: '95%', margin: 'auto', marginLeft: "2%", borderRadius: '9px' }} alt="" />
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

import React, { useEffect, useState } from 'react'
import SyncIcon from '@mui/icons-material/Sync';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { baseurl } from '../apicalls'
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Post(props) {
    const [user, setuser] = useState(null)
    useEffect(() => {
        async function getUserDetails() {
            const result = await fetch(`${baseurl}/user/${props.uid}`)
            const user = await result.json()
            setuser(user)
        }
        getUserDetails()
    }, [])
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '9px', marginBottom: '15px', paddingBottom: '15px' }}>
            <div className='post' style={{ padding: '12px', backgroundColor: 'white', borderRadius: '9px', position: 'relative',paddingBottom:'5.5px' }}>
                <div className="userheader">
                    <div className="user" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
                        <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2%' }} src={user?.userimg} alt="" />
                        <div className="timeuser" style={{ display: 'flex', flexDirection: 'column', }}>
                            <h6 style={{ fontSize: '12px', margin: '0', marginLeft: '12px', width: 'fit-content' }}>{user?.username}</h6>
                            <p style={{ fontSize: '9px', margin: '0', marginLeft: '12px' }}>{props.date}</p>
                        </div>
                    </div>
                    <MoreVertIcon style={{ fontSize: "16px", cursor: 'pointer', position: 'absolute', top: '30px', right: '19px' }} />
                </div>
                <Link to={`/post/postid=${props.postid}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="captions">
                        <p style={{ fontSize: '11.5px', marginLeft: '2%' }}>{props.caption}</p>
                        <div className="hashtags" style={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                props.hashtag?.map((item, index) => {
                                    return <p key={index} style={{ fontSize: '11.5px', marginLeft: '2%', color: 'rgb(47, 128, 237)', marginTop: '-7px' }}>#{item}</p>
                                })
                            }
                        </div>
                    </div>
                    <div className="image">
                        {
                            props.img ? <img src={props.img} style={{ width: '95%', margin: 'auto', marginLeft: "2%", borderRadius: '9px' }} alt="" /> : <></>
                        }
                    </div>
                </Link>
            </div>
            <div className="benchmarks" style={{display:'flex',flexDirection:'row',width:'fit-content',marginLeft:'auto',marginRight:'2%'}}>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight:"9px"}}>{props.likes.length} Likes</p>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight:"9px"}}>{props.retweets.length} Retweets</p>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight:"9px"}}>{props.comments.length} Comments</p>
            </div>
            <div className="actionbuttons" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', margin: 'auto', marginTop: '6px' }}>
                <div className="comments hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px' }}>
                    <ChatBubbleOutlineIcon style={{ width: '18px', marginRight: '9px' }} />
                    <p style={{ fontSize: '12px' }}>Comment</p>
                </div>
                <div className="retweet hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px' }}>
                    <SyncIcon style={{ width: '18px', marginRight: '9px' }} />
                    <p style={{ fontSize: '12px' }}>Retweet</p>
                </div>
                <div className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px' }}>
                    <FavoriteBorderIcon style={{ width: '18px', marginRight: '9px' }} />
                    <p style={{ fontSize: '12px' }}>Like</p>
                </div>
                <div className="save hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px' }}>
                    <BookmarkBorderIcon style={{ width: '18px', marginRight: '9px' }} />
                    <p style={{ fontSize: '12px' }}>Save</p>
                </div>

            </div>


        </div>
    )
}

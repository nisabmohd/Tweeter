import React, { useEffect, useState } from 'react'
import SyncIcon from '@mui/icons-material/Sync';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { baseurl } from '../apicalls'
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Post(props) {
    const [user, setuser] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [liked, setLiked] = useState(false)
    const [retweeted, setRetweeted] = useState(false)
    const [likesCount,setlikesCount]=useState(props.likes.length)
    const [commentsCount,setcommentsCount]=useState(props.comments.length)
    const [retweetCount,setretweetCount]=useState(props.retweets.length)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };
    useEffect(() => {
        async function getUserDetails() {
            const result = await fetch(`${baseurl}/user/${props.uid}`)
            const user = await result.json()
            setuser(user)
        }
        getUserDetails()
        if (props.likes.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
            setLiked(true)
        }
        if (props.retweets.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
            setRetweeted(true)
        }
    }, [])
    async function handleLike() {
        if (liked) {
            const res = await fetch(`${baseurl}/post/unlike/${props.postid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: JSON.parse(localStorage.getItem('auth')).uid })
            })
            const data = await res.json()
            console.log(data);
            setLiked(false)
            setlikesCount(likesCount-1)
        }
        else {
            const res = await fetch(`${baseurl}/post/like/${props.postid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: JSON.parse(localStorage.getItem('auth')).uid })
            })
            const data = await res.json()
            console.log(data);
            setLiked(true)
            setlikesCount(likesCount+1)
        }
    }
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '9px', marginBottom: '15px', paddingBottom: '15px' }}>
            <div className='post' style={{ padding: '12px', backgroundColor: 'white', borderRadius: '9px', position: 'relative', paddingBottom: '5.5px' }}>
                <div className="userheader">
                    <div className="user" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
                        <Link to={`/user/${user?.uid}`} style={{ marginLeft: '2%' }}><img style={{ width: '32px', borderRadius: '9px' }} src={user?.userimg} alt="" /></Link>
                        <div className="timeuser" style={{ display: 'flex', flexDirection: 'column', }}>
                            <h6 style={{ fontSize: '12px', margin: '0', marginLeft: '12px', width: 'fit-content' }}><Link to={`/user/${user?.uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user?.username}</Link></h6>
                            <p style={{ fontSize: '9px', margin: '0', marginLeft: '12px' }}>{props.date}</p>
                        </div>
                    </div>
                    <MoreVertIcon onClick={handleClick} style={{ fontSize: "16px", cursor: 'pointer', position: 'absolute', top: '30px', right: '19px' }} />
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
                        <MenuItem onClick={handleClose} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><div style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }}><ShareIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} />Share</div></MenuItem>
                        {
                            props.uid === JSON.parse(localStorage.getItem('auth')).uid ? <MenuItem onClick={handleClose} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><div style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }}><DeleteOutlineIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} />Delete</div></MenuItem> : <div></div>
                        }


                    </Menu>
                </div>
                {
                    (props.noturl) ? <div style={{ textDecoration: 'none', color: 'inherit' }} >
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
                    </div> : <Link to={`/post/${props.postid}`} style={{ textDecoration: 'none', color: 'inherit' }} >
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
                }


            </div>
            <div className="benchmarks" style={{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginLeft: 'auto', marginRight: '2%' }}>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px" }}>{likesCount} Likes</p>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px" }}>{retweetCount} Retweets</p>
                <p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px" }}>{commentsCount} Comments</p>
            </div>
            <div className="actionbuttons" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', margin: 'auto', marginTop: '6px' }}>
                <Button className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    <ChatBubbleOutlineIcon style={{ width: '18px',}} />
                    <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px'   }}>Comment</p>
                </Button>
                <Button className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        retweeted ? <><SyncIcon style={{ width: '18px', color: 'green' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'green', marginLeft: '9px'   }}>Retweet</p></> : <><SyncIcon style={{ width: '18px' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px'   }}>Retweet</p></>
                    }

                </Button>
                <Button onClick={() => handleLike()} className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        liked ? <><FavoriteIcon style={{ width: '18px',color: 'red' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'red', marginLeft: '9px'  }}>Like</p></> : <><FavoriteBorderIcon style={{ width: '18px'}} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px'  }}>Like</p></>
                    }

                </Button>
                <Button className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        JSON.parse(localStorage.getItem('auth')).saved.includes(props.postid) ? <> <BookmarkIcon style={{ width: '18px',color: 'rgb(47, 128, 237)' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'rgb(47, 128, 237)', marginLeft: '9px'   }}>Save</p></> : <> <BookmarkBorderIcon style={{ width: '18px' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px'   }}>Save</p></>
                    }

                </Button>

            </div>


        </div>
    )
}

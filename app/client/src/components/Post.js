import React, { useEffect, useState } from 'react'
import SyncIcon from '@mui/icons-material/Sync';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { baseurl } from '../apicalls'
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Dialog, DialogContent, DialogContentText, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import toast, { Toaster } from 'react-hot-toast';
import SendIcon from "@mui/icons-material/Send";
import Listuser from './Listuser';


export default function Post(props) {
    const [user, setuser] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [liked, setLiked] = useState(false)
    const [retweeted, setRetweeted] = useState(false)
    const [saved, setSaved] = useState(false)
    const [likesCount, setlikesCount] = useState(props.likes.length)
    const [commentsCount, setcommentsCount] = useState(props.comments.length)
    const [retweetCount, setretweetCount] = useState(props.retweets.length)
    const [commentText, setCommentText] = useState('')
    const [open1, setOpen1] = React.useState(false);
    const [me, setMe] = useState(null)

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };
    const [openlikes, setOpenlikes] = React.useState(false);
    const [openretweets, setOpenretweets] = React.useState(false);

    const handleClickOpenLikes = () => {
        setOpenlikes(true);
    };

    const handleCloseLikes = () => {
        setOpenlikes(false);
    };
    const handleClickOpenRetweets = () => {
        setOpenretweets(true);
    };

    const handleCloseRetweets = () => {
        setOpenretweets(false);
    };


    async function getme() {
        const result = await fetch(`${baseurl}/user/${JSON.parse(localStorage.getItem('auth')).uid}`)
        const user = await result.json()
        setMe(user.saved)
    }
    async function getUserDetails() {
        getme()
        const result = await fetch(`${baseurl}/user/${props.uid}`)
        const user = await result.json()
        // console.log(user.saved);
        setuser(user)
        if (me?.includes(props.postid)) {
            setSaved(true)
        }
        // console.log(user.saved);

    }
    useEffect(() => {
        getUserDetails()
        if (props.likes.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
            setLiked(true)
        }
        if (props.retweets.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
            setRetweeted(true)
        }

    }, [])
    useEffect(() => {
        if (me != null)
            if (me.includes(props.postid)) {
                setSaved(true)
            }
    }, [me])
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
            console.debug(data);
            setLiked(false)
            setlikesCount(likesCount - 1)
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
            console.debug(data);
            setLiked(true)
            setlikesCount(likesCount + 1)
        }
    }
    async function handleRetweet() {
        if (retweeted) {
            const res = await fetch(`${baseurl}/post/undoretweet/${props.postid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: JSON.parse(localStorage.getItem('auth')).uid })
            })
            const data = await res.json()
            console.log(data);
            setRetweeted(false)
            setretweetCount(retweetCount - 1)
        }
        else {
            const res = await fetch(`${baseurl}/post/retweet/${props.postid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: JSON.parse(localStorage.getItem('auth')).uid })
            })
            const data = await res.json()
            console.log(data);
            setRetweeted(true)
            setretweetCount(retweetCount + 1)
        }
    }
    async function handleComment() {
        if (commentText === '') {
            return toast.error('Enter comment to post')
        }
        const data = {
            uid: JSON.parse(localStorage.getItem('auth')).uid,
            comment: commentText
        }
        fetch(`${baseurl}/post/comment/${props.postid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                toast.success('Commented', {
                    duration: 3000,
                    style: {
                        fontSize: '12px'
                    }
                });
                setcommentsCount(commentsCount + 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    async function handleSave() {
        if (!saved) {
            const data = {
                post_id: props.postid
            }
            fetch(`${baseurl}/post/addsaved/${JSON.parse(localStorage.getItem('auth')).uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    setSaved(true)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            const data = {
                post_id: props.postid
            }
            fetch(`${baseurl}/post/undosaved/${JSON.parse(localStorage.getItem('auth')).uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    setSaved(false)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    async function handlecopy() {
        let str = window.location.pathname
        let url = window.location.href
        const newstr = url.replace(str, '')

        navigator.clipboard.writeText(`${newstr}/post/${props.postid}`);
        toast.success('Copied to clipboard', {
            duration: 3000,
            style: {
                fontSize: '12px'
            }
        });

    }
    async function deleteTweet() {
        const data = {
            uid: JSON.parse(localStorage.getItem('auth')).uid
        }
        fetch(`${baseurl}/post/${props.postid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log("deleted");
                // usehistory
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div style={{ backgroundColor: 'white', borderRadius: '9px', marginBottom: '15px', paddingBottom: '15px' }}>
            <Toaster />
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
                        <MenuItem onClick={() => { handlecopy(); handleClose() }} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><div style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }}><ShareIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} />Share</div></MenuItem>
                        {
                            props.uid === JSON.parse(localStorage.getItem('auth')).uid ? <MenuItem onClick={() => { deleteTweet(); handleClose() }} style={{ fontSize: '12px', fontFamily: 'Poppins' }}><div style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'row', alignItems: 'center' }}><DeleteOutlineIcon style={{ width: '18px', height: '18px', marginRight: '10px' }} />Delete</div></MenuItem> : <div></div>
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
                                        return <Link to={`/search/${item}`} key={index} style={{ fontSize: '11.5px', marginLeft: '2%', color: 'rgb(47, 128, 237)', marginTop: '-7px',textDecoration:'none',marginBottom:'7px' }}>#{item}</Link>
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
                                        return <Link to={`/search/${item}`} key={index} style={{ fontSize: '11.5px', marginLeft: '2%', color: 'rgb(47, 128, 237)', marginTop: '-7px',textDecoration:'none',marginBottom:'7px' }}>#{item}</Link>
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
                <p onClick={handleClickOpenLikes} style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px", cursor: 'pointer' }}>{likesCount} Likes</p>
                <Dialog
                    open={openlikes}
                    onClose={handleCloseLikes}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Likes
                        </DialogContentText>
                        <Listuser uid={props.uid} postid={props.postid} likes={true} text="Likes" />
                        {/* <Followers uid={props.uid} profilefollowing={setMyfollowing} foll={myFollowing} ></Followers> */}
                    </DialogContent>
                </Dialog>
                <p onClick={handleClickOpenRetweets} style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px", cursor: 'pointer' }}>{retweetCount} Retweets</p>
                <Dialog
                    open={openretweets}
                    onClose={handleCloseRetweets}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Retweets
                        </DialogContentText>
                        <Listuser uid={props.uid} postid={props.postid} retweet={true} text="Retweets" />
                        {/* <Followers uid={props.uid} profilefollowing={setMyfollowing} foll={myFollowing} ></Followers> */}
                    </DialogContent>
                </Dialog>
                <Link to={`/post/${props.postid}`} style={{textDecoration:'none',color:'inherit'}}><p style={{ fontSize: '10px', color: 'rgb(130, 130, 130)', marginRight: "9px" }}>{commentsCount} Comments</p></Link>
            </div>
            <div className="actionbuttons" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85%', margin: 'auto', marginTop: '6px' }}>
                <Button onClick={handleClickOpen1} className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    <ChatBubbleOutlineIcon style={{ width: '18px', }} />
                    <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px' }}>Comment</p>
                </Button>
                <Dialog
                    open={open1}
                    maxWidth="sm"
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img style={{ width: '35px', borderRadius: '9px', marginLeft: '-4px', marginTop: '-5px', marginRight: '5px' }} src={JSON.parse(localStorage.getItem('auth')).userimg} alt="" />
                            <input
                                type="text"
                                style={{
                                    height: "36px",
                                    width: "345px",
                                    marginLeft: "9px",
                                    outline: "none",
                                    border: "1px solid rgb(224, 224, 224)",
                                    paddingLeft: "7px",
                                    borderRadius: "6px",
                                    fontFamily: "Poppins",
                                    fontSize: "12px"
                                }}
                                placeholder="Tweet your reply"
                                value={commentText}
                                onChange={e => setCommentText(e.target.value)}
                            />
                            <Button onClick={() => { handleComment(); handleClose1() }} style={{ marginLeft: "3.5px", marginRight: '-19px' }}>
                                <SendIcon style={{ fontSize: '27px', color: 'gray', }} />
                            </Button>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <Button onClick={() => handleRetweet()} className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        retweeted ? <><SyncIcon style={{ width: '18px', color: 'rgb(117,192,96)' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'rgb(117,192,96)', marginLeft: '9px' }}>Retweet</p></> : <><SyncIcon style={{ width: '18px' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px' }}>Retweet</p></>
                    }

                </Button>
                <Button onClick={() => handleLike()} className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        liked ? <><FavoriteIcon style={{ width: '18px', color: 'red' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'red', marginLeft: '9px' }}>Like</p></> : <><FavoriteBorderIcon style={{ width: '18px' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px' }}>Like</p></>
                    }

                </Button>
                <Button onClick={() => handleSave()} className="likes hoverbtn" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0.2px 9px', borderRadius: '6px', cursor: 'pointer', paddingRight: '12px', border: 'none', outline: 'none', color: 'inherit', fontFamily: 'Poppins', textTransform: 'lowercase' }}>
                    {
                        saved ? <> <BookmarkIcon style={{ width: '18px', color: 'rgb(47, 128, 237)' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', color: 'rgb(47, 128, 237)', marginLeft: '9px' }}>Save</p></> : <> <BookmarkBorderIcon style={{ width: '18px' }} />
                            <p className='parahideaction' style={{ fontSize: '12px', marginLeft: '9px' }}>Save</p></>
                    }

                </Button>
            </div>

        </div>
    )
}

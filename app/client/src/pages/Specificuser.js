import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { baseurl } from '../apicalls'
import Listuser from '../components/Listuser'
import Post from '../components/Post'
import Whotofollow from '../components/Whotofollow'

export default function Specificuser(props) {
    const uid = useParams().uid
    const navigate = useNavigate()
    const [totalfollowers, settotalfollowers] = useState(0)
    const [totalfollowings, settotalfollowings] = useState(0)
    const [profile, setProfile] = useState(null)
    const [doesfollow, setDoesfollow] = useState(false)
    const [posts, setPosts] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [ad,setAd]=useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    useEffect(() => {
        if (uid === (JSON.parse(localStorage.getItem('auth')).uid)) {
            setAd(true)
        }
        setOpen1(false)
        setOpen(false)
        async function getprofile() {
            const result = await fetch(`${baseurl}/user/${uid}`)
            const data = await result.json()
            setProfile(data)
            settotalfollowers(data.followers.length)
            settotalfollowings(data.following.length)
            if (data.followers.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
                setDoesfollow(true)
            }
        }
        async function getUserpost() {
            const result = await fetch(`${baseurl}/post/up/${uid}`)
            const data = await result.json()
            setPosts(data)
        }
        getprofile();
        getUserpost();
    }, [navigate, uid])
    async function handlefollow() {
        if (doesfollow) {
            const data = {
                uid: JSON.parse(localStorage.getItem('auth')).uid
            }
            fetch(`${baseurl}/user/unfollow/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDoesfollow(false)
                    settotalfollowers(totalfollowers - 1)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {
            const data = {
                uid: JSON.parse(localStorage.getItem('auth')).uid
            }
            fetch(`${baseurl}/user/follow/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    setDoesfollow(true)
                    settotalfollowers(totalfollowers + 1)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    return (
        <div className='profile'>
            <div className="coverimage">
                <img style={{ width: '100%', height: '250px', objectFit: 'cover' }} src={profile?.coverimg} alt="" />
            </div>
            <div className="container" style={{ marginTop: '-79px' }}>
                <div className="container userdetails" style={{}}>
                    <div className="leftimg" style={{ background: 'white', padding: '1.8px', marginTop: '-69px', borderRadius: '9px' ,marginLeft:'20px' }}>
                        <img style={{ width: '128px', borderRadius: '9px' }} src={profile?.userimg} alt="" />
                    </div>
                    <div className="rightDetails" style={{ width: '100%', marginLeft: '20px'  }}>
                        <div className="namefoll" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <div className="leftfollowers" style={{}}>
                                <h4 className='profilename' style={{ width: 'max-content', marginRight: '19px' }}>{profile?.username}</h4>
                                <div className="follws justcol">
                                    <p onClick={handleClickOpen1} style={{ fontSize: '11.785px', cursor: 'pointer', marginRight: '12px' }}><span style={{ color: 'black', fontWeight: 'bold' }}>{totalfollowings}</span> Followings</p>
                                    <Dialog
                                        open={open1}
                                        onClose={handleClose1}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Followings
                                            </DialogContentText>
                                            <Listuser uid={uid} following={true} text="Followings" />
                                            {/* <Following uid={uid}></Following> */}
                                        </DialogContent>
                                    </Dialog>
                                    <p onClick={handleClickOpen} style={{ fontSize: '11.985px', cursor: 'pointer', marginRight: '12px' }}><span style={{ color: 'black', fontWeight: 'bold' }}>{totalfollowers}</span> Followers</p>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Followers
                                            </DialogContentText>
                                            <Listuser uid={uid} followers={true} text="Followers" />
                                            {/* <Followers uid={uid}></Followers> */}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                            <div className="rightfollowbtn" style={{ marginRight: '19px' }}>{
                                ad?<><Link to={`/edit`} style={{ textDecoration: 'none', color: 'inherit' }}><button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '-13px' }}>Edit</button></Link></>:<button onClick={() => handlefollow()} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '-13px' }}>{
                                    doesfollow ? "Unfollow" : "Follow"
                                }</button>
                            }
                                
                            </div>
                        </div>
                        <div className="caption" style={{ width: '98%' }}>
                            <p style={{ fontSize: '12.85px', marginTop: '-2px' }}>{profile?.bio === "" ? "-" : profile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="right_container homehide" style={{ marginLeft: '0' }}>
                    <Whotofollow uid={props.uid} mtop='0px' marginRight="20px" />
                </div>
                <div className="left_container" style={{ }}>
                    <div className="posts">
                        {
                            (posts.length !== 0) ?
                                posts.map(item => {
                                    return <Post likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id + item.likes.length + Math.floor(Math.random() * 1000)} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
                                }) : <div className="paragraph" style={{ width: '100%' }}><p style={{ textAlign: 'center' }}>No Posts to see</p></div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

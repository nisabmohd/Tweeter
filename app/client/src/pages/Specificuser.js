import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseurl } from '../apicalls'
import Post from '../components/Post'
import Tags from '../components/Tags'

export default function Specificuser() {
    const uid = useParams().uid
    const navigate = useNavigate()
    const [totalfollowers, settotalfollowers] = useState(0)
    const [totalfollowings, settotalfollowings] = useState(0)
    const [profile, setProfile] = useState(null)
    const [doesfollow, setDoesfollow] = useState(false)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        if (uid === (JSON.parse(localStorage.getItem('auth')).uid)) {
            return navigate('/profile')
        }
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
    }, [])
    useEffect(() => {
        if (profile)
            if (profile.followers.includes(JSON.parse(localStorage.getItem('auth')).uid)) {
                setDoesfollow(true)
            }
    }, [profile])
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
                <div className="userdetails" style={{ background: 'white', borderRadius: '9px', padding: '12px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div className="leftimg" style={{ background: 'white', padding: '1.8px', marginTop: '-69px', borderRadius: '9px' }}>
                        <img style={{ width: '128px', borderRadius: '9px' }} src={profile?.userimg} alt="" />
                    </div>
                    <div className="rightDetails" style={{ width: '100%' }}>
                        <div className="namefoll" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <div className="leftfolowers" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '36%' }}>
                                <h4 style={{}}>{profile?.username}</h4>
                                <p style={{ fontSize: '11.785px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>{totalfollowings}</span> Following</p>
                                <p style={{ fontSize: '11.985px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>{totalfollowers}</span> Followers</p>
                            </div>
                            <div className="rightfollowbtn" style={{ marginRight: '19px' }}>
                                <button onClick={() => handlefollow()} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '-13px' }}>{
                                    doesfollow ? "Unfollow" : "Follow"
                                }</button>
                            </div>
                        </div>
                        <div className="caption" style={{ width: '98%' }}>
                            <p style={{ fontSize: '12.85px', marginLeft: '35px', marginTop: '-2px' }}>{profile?.bio === "" ? "-" : profile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="right_container" style={{ marginLeft: '0' }}>
                    <Tags marginleft="0px" />
                </div>
                <div className="left_container" style={{ marginLeft: '20px' }}>
                    <div className="posts">
                        {
                            posts.map(item => {
                                return <Post likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)}  key={item.post_id +item.likes.length+Math.floor(Math.random()*1000)} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

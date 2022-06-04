import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'
import { baseurl } from '../apicalls'
import { Link } from 'react-router-dom'

export default function Profile(props) {
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function getprofile() {
            const result = await fetch(`${baseurl}/user/${props.uid}`)
            const data = await result.json()
            setProfile(data)
        }
        async function getUserpost() {
            const result = await fetch(`${baseurl}/post/up/${props.uid}`)
            const data = await result.json()
            setPosts(data)
        }
        getprofile();
        getUserpost()
    }, [])
    useEffect(() => {

    }, [profile])
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
                                <p style={{ fontSize: '11.785px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>{profile?.following.length}</span> Following</p>
                                <p style={{ fontSize: '11.985px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>{profile?.followers.length}</span> Followers</p>
                            </div>
                            <div className="rightfollowbtn" style={{ marginRight: '19px' }}>
                                <Link to={`/edit`} style={{textDecoration:'none',color:'inherit'}}><button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '-13px' }}>Edit</button></Link>
                            </div>
                        </div>
                        <div className="caption" style={{ width: '98%' }}>
                            <p style={{ fontSize: '12.85px', marginLeft: '35px', marginTop: '-2px' }}>{profile?.bio === "" ? "-" : profile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="right_container" style={{ marginLeft: '0',marginRight:"20px" }}>
                    <Tags marginleft="0px" />
                </div>
                <div className="left_container" style={{}}>
                    <div className="posts ">
                        {
                            (posts.length!==0)?
                            posts.map(item => {
                                return <Post likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id}  hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
                            }):<div className="paragraph"style={{width:'100%'}}><p style={{textAlign:'center'}}>No Posts to see</p></div>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

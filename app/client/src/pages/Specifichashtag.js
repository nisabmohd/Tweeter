import React, { useEffect, useState } from 'react'
import {useParams } from "react-router-dom";
import Tags from '../components/Tags';
import Whotofollow from '../components/Whotofollow';
import { baseurl } from '../apicalls';
import Post from '../components/Post';


export default function Specifichashtag() {
    const tag = useParams().hashtag
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function fetchhashtag() {
            const res = await fetch(`${baseurl}/post/hashtag/${tag}`)
            const data = await res.json()
            
            setPosts(data)
        }
        fetchhashtag()
    }, [])
    return (<>
        <div className="container ">
            <div className="right_container" style={{ marginLeft: 0, marginRight: '15px' }}>
                <Tags marginleft="0px" />
                <Whotofollow uid={JSON.parse(localStorage.getItem('auth')).uid} marginleft="0px" />
            </div>
            <div className="left_container">
                <div className="posts paddingcont" style={{}}>
                    {
                        posts.length === 0 ? <><div className="paragraph"style={{width:'100%'}}><p style={{textAlign:'center'}}>No post to see</p></div></> :
                            posts.map(item => {
                                return <Post likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
                            })
                    }
                </div>
            </div>
        </div>
    </>
    )
}

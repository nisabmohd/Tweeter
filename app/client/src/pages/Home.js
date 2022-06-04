import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls'
import Newtweet from '../components/Newtweet'
import Post from '../components/Post'
// import Post from '../components/Post'
import Tags from '../components/Tags'
import Whotofollow from '../components/Whotofollow'
function Home(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function gettimeline() {
      const res = await fetch(`${baseurl}/post/timeline/${props.uid}`)
      const data = await res.json()
      setPosts(data);
    }
    gettimeline()
  }, [])
  return (
    <div className="container">
      <div className="left_container">
        <Newtweet uid={props.uid} userimg={props.userimg} />
        <div className="posts" style={{ marginTop: '39px' }}>
          {
            posts.map(item => {
              return <Post key={item.post_id + new Date().toDateString()} likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
            })
          }
        </div>
      </div>
      <div className="right_container">
        <Tags marginleft="15px" />
        <Whotofollow uid={props.uid} marginleft="15px" />
      </div>
    </div>
  )
}

export default Home
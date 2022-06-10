import React, { useEffect, useState } from 'react'
// import Post from '../components/Post'
import Tags from '../components/Tags'
import {baseurl} from '../apicalls'
import Post from '../components/Post'

function Saved(props) {
  const[saved,setSaved]=useState([])
  useEffect(()=>{
    async function getposts(){
      const res=await fetch(`${baseurl}/post/saved/${props.uid}`)
      const data=await res.json()
      setSaved(data)
      return;
    }
    getposts()
  },[props.uid])
  return (
    <div className="container">
      <div className="left_container">
        <div className="posts">
          {
            saved?.length===0&&saved?( <div className="paragraph"style={{width:'100%'}}><p style={{textAlign:'center'}}>No Saved Posts</p></div>):(<>
            {
            saved?.map(item => {
              return <Post likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
            })
          }
            </>)
          }
        </div>
      </div>
      <div className="right_container homehide">
        <Tags marginleft="15px" />
      </div>
    </div>
  )
}

export default Saved
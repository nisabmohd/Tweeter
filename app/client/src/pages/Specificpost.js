import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useParams } from "react-router-dom";
import { baseurl } from '../apicalls';
export default function Specificpost() {
  const postid=useParams().postid
  const [post,setPost]=useState(null)
  useEffect(()=>{
    async function getPost(){
      const res=await fetch(`${baseurl}/post/${postid}`)
      const post=await res.json()
      console.log(post);
      setPost(post)
    }
    getPost()
  },[])

  return (
    <div className='container'>
      {
        post?<div style={{width:'100%'}}><Post noturl={true} likes={post.likes} comments={post.comments} retweets={post.retweet} postid={post.post_id} hashtag={post.hashtag} uid={post.uid} date={post.timestamp.toLocaleString("en-US").slice(0, 10)} key={post.post_id} userimg={post.userimg} img={post.image} name={post.username} caption={post.caption} /></div>:<></>
      }
     
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import { useParams } from "react-router-dom";
import { baseurl } from '../apicalls';
import Comment from '../components/Comment'

export default function Specificpost() {
  const postid = useParams().postid
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])


  useEffect(() => {
    async function getPost() {
      const res = await fetch(`${baseurl}/post/${postid}`)
      const post = await res.json()
      setComments(post.comments)
      setPost(post)
    }
    getPost()
  }, [postid])

  return (
    <>
      <div className='container'>
        {
          post ? <div style={{ width: '100%' }}><Post saved={post.saved}  noturl={true} likes={post.likes} comments={post.comments} retweets={post.retweet} postid={post.post_id} hashtag={post.hashtag} uid={post.uid} date={post.timestamp} key={post.post_id} userimg={post.userimg} img={post.image} name={post.username} caption={post.caption} /></div> : <></>
        }

      </div>
      <div className="container" style={{ marginTop: '9px', marginBottom: '15px', borderRadius: '9px', display: 'flex', flexDirection: 'column',backgroundColor:'rgb(33 35 36)'  }}>
        <h5 style={{ marginLeft: '15px', marginTop: '2px', marginBottom: '2px',color:'#dadada'  }}>Comments</h5>
        <div className="comments" style={{ marginTop: '8px', marginBottom: '12px' }}>
          {
            comments.length === 0 ? <><p style={{ fontSize: '11px', marginLeft: '17px',color:'white' }}>No comments to see</p></> : <>
              {
                comments.map(item => {
                  return <Comment key={item.uid} uid={item.uid} comment={item.comment} />
                })
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'
import Whotofollow from '../components/Whotofollow'
import { baseurl } from '../apicalls'

export default function Explore() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function getAll() {
      const res = await fetch(`${baseurl}/post/allpost`)
      const data = await res.json()
      setPosts(data)
    }
    getAll()
  }, [])

  return (
    <div className="container">
      <div className="right_container" style={{ marginLeft: 0, marginRight: '15px' }}>
        <Tags marginleft="0px" />
        <Whotofollow marginleft="0px" />
      </div>
      <div className="left_container">
        <div className="posts" style={{}}>
          {
            posts.map(item => {
              return <Post date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
            })
          }
        </div>
      </div>

    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'
import Whotofollow from '../components/Whotofollow'
import { baseurl } from '../apicalls'
import SearchIcon from '@mui/icons-material/Search';

export default function Explore(props) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function getAll() {
      const res = await fetch(`${baseurl}/post/allpost/${props.uid}`)
      const data = await res.json()
      setPosts(data)
    }
    getAll()
  }, [])

  return (
    <>
      <div className="container" style={{ marginTop: '-5px' }}>
        <div className="searchbar" style={{ width: '100%', backgroundColor: 'white', height: '45px', borderRadius: '9px', marginBottom: '-9px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <input type="text" style={{ height: '85%', width: '92%', outline: 'none', border: 'none', fontFamily: 'Poppins' }} placeholder="Search ..." />
          <SearchIcon style={{ fontSize: '19px', cursor: 'pointer' }} />
        </div>
      </div>
      <div className="container ">
        <div className="right_container" style={{ marginLeft: 0, marginRight: '15px' }}>
          <Tags marginleft="0px" />
          <Whotofollow uid={props.uid} marginleft="0px" />
        </div>
        <div className="left_container">
          <div className="posts paddingcont" style={{}}>
            {
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

import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'
import Whotofollow from '../components/Whotofollow'
import { baseurl } from '../apicalls'
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, MenuItem, Select } from '@mui/material'

export default function Explore(props) {
  const [posts, setPosts] = useState([])
  const [categ, setCateg] = React.useState('users');
const [searchtext,setSearchtext]=useState('')
  const handleChange = (event) => {
    setCateg(event.target.value);
  };

  useEffect(() => {
    async function getAll() {
      const res = await fetch(`${baseurl}/post/allpost/${props.uid}`)
      const data = await res.json()
      setPosts(data)
    }
    getAll()
  }, [])
  const searchHandle=()=>{
    
  }

  return (
    <>
      <div className="container" style={{ marginTop: '-5px' }}>
        <div className="filter" style={{ width: '30%', backgroundColor: 'white', height: '45px', borderRadius: '9px', marginBottom: '-9px', marginRight: '15px' }}>
          <FormControl sx={{width:'93%',height:'100%',border:'none',outline:'none',marginBottom:'0px',fontSize:'12px',marginLeft:'17px'}}>
            <Select disableUnderline 
            sx={{fontSize:'14px',fontFamily:'Poppins',border:'none',outline:'none',height:'inherit'}}
              value={categ}
              variant="standard"
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' ,'border':'none'}}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem sx={{fontSize:'13.4px',fontFamily:'Poppins'}} value={'users'}>Users</MenuItem>
              <MenuItem sx={{fontSize:'13.4px',fontFamily:'Poppins'}} value={'hashtag'}>Hashtags</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="searchbar" style={{ width: '70%', backgroundColor: 'white', height: '45px', borderRadius: '9px', marginBottom: '-9px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <input value={searchtext} onChange={e=>setSearchtext(e.target.value)} type="text" style={{ height: '85%', width: '92%', outline: 'none', border: 'none', fontFamily: 'Poppins' }} placeholder="Search ..." />
          <SearchIcon onClick={e=>searchHandle()} style={{ fontSize: '19px', cursor: 'pointer' }} />
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

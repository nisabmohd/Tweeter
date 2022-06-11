import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'
import Whotofollow from '../components/Whotofollow'
import { baseurl } from '../apicalls'
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, MenuItem, Select } from '@mui/material'
import Customcarduser from '../components/Customcarduser'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function Explore(props) {
  const navigate=useNavigate()
  const [posts, setPosts] = useState([])
  const [categ, setCateg] = React.useState('users');
  const [searchtext, setSearchtext] = useState('')
  const [serachres, setSearchres] = useState([])

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
  }, [props.uid])
  const searchHandle = () => {
    if (categ === 'users') {
      fetch(`${baseurl}/user/search/find`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: searchtext }),
      })
        .then(response => response.json())
        .then(data => {
          setSearchres(data)
          if(data.length===0){
            toast.error('No such user found', {
                duration: 2000,
                style: {
                  fontFamily: 'Poppins',
                  fontSize: '11px'
              },
            });
        }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else{
      navigate(`/search/${searchtext}`)
    }
  }

  return (
    <>
    <Toaster/>
      <div className="container1" style={{ marginTop: '-5px' }}>
        <div className="filter" style={{ }}>
          <FormControl sx={{ width: '93%', height: '100%', border: 'none', outline: 'none', marginBottom: '0px', fontSize: '12px', marginLeft: '17px' }}>
            <Select disableUnderline
              sx={{ fontSize: '14px', fontFamily: 'Poppins', border: 'none', outline: 'none', height: 'inherit' }}
              value={categ}
              variant="standard"
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label', 'border': 'none' }}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem sx={{ fontSize: '13.4px', fontFamily: 'Poppins' }} value={'users'}>Users</MenuItem>
              <MenuItem sx={{ fontSize: '13.4px', fontFamily: 'Poppins' }} value={'hashtag'}>Hashtags</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="searchbar" style={{  }}>
          <input value={searchtext} onChange={e => setSearchtext(e.target.value)} type="text" style={{ height: '85%', width: '88%', outline: 'none', border: 'none', fontFamily: 'Poppins',paddingLeft:'15px' }} placeholder="Search ..." />
          <SearchIcon onClick={e => searchHandle()} style={{ fontSize: '19px', cursor: 'pointer' }} />
        </div>
      </div>
      <div className="container ">
        <div className="right_container" style={{ marginLeft: 0, marginRight: '15px' }}>
          <Tags marginleft="0px" />
          <Whotofollow uid={props.uid} marginleft="0px" mtop='19px' />
        </div>
        <div className="left_container">
          <div className="posts paddingcont" style={{}}>
            {
              serachres?.length === 0 ?
                posts.map(item => {
                  return <Post saved={item.saved} likes={item.likes} comments={item.comments} retweets={item.retweet} postid={item.post_id} hashtag={item.hashtag} uid={item.uid} date={item.timestamp.toLocaleString("en-US").slice(0, 10)} key={item.post_id} userimg={item.userimg} img={item.image} name={item.username} caption={item.caption} />
                }) : <div style={{ backgroundColor: 'white', borderRadius: '9px', padding: '15px' }}><div className="header" style={{ width: '96.25%', margin: 'auto' }}>
                  <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', marginLeft: '-9px' }}>Search Results</h6>
                </div>{serachres?.map(item => <Customcarduser width="99%" key={item._id} username={item.username} uid={item.uid} userimg={item.userimg} followers={item.followers} bio={item.bio} />)}</div>

            }
          </div>
        </div>

      </div>
    </>
  )
}

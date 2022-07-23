// import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls'
import Renderusers from './Renderusers'

export default function Listuser(props) {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    async function getprofile() {
      const result1 = await fetch(`${baseurl}/user/${props.uid}`)
      const data1 = await result1.json()
      if (props.following)
        setUsers(data1.following)
      if (props.followers)
        setUsers(data1.followers)

    }
    async function getPost() {
      const res = await fetch(`${baseurl}/post/${props.postid}`)
      const post = await res.json()
      if (props.likes)
        setUsers(post.likes)
      if (props.retweet)
        setUsers(post.retweet)
    }
    if (props.followers || props.following)
      getprofile()
    if (props.likes || props.retweet) {
      getPost()
    }
  }, [props.followers, props.following, props.likes, props.postid, props.retweet, props.uid])
  return (
    <>
      {
        users? 
          users?.map(item => <Renderusers profilefollowing={props.profilefollowing} foll={props.foll} key={item} specific={props.specific} uid={item} />)
          :<><p style={{ fontSize: '13px',color:'white' }}>Ohh Snap</p></>
      }
    </>
  )
}

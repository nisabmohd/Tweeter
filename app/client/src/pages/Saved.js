import React, { useEffect, useState } from 'react'
// import Post from '../components/Post'
import Tags from '../components/Tags'

function Saved(props) {
  const[saved,setSaved]=useState([])
  useEffect(()=>{

  },[])
  return (
    <div className="container">
      <div className="left_container">
        <div className="posts">
          {
            saved.length===0&&saved?( <div className="paragraph"style={{width:'100%'}}><p style={{textAlign:'center'}}>No Saved Posts</p></div>):(<></>)
          }
        </div>
      </div>
      <div className="right_container">
        <Tags marginleft="15px" />
      </div>
    </div>
  )
}

export default Saved
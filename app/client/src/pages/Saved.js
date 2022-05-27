import React from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'

function Saved() {
  return (
    <div className="container">
      <div className="left_container">
        <div className="posts" style={{}}>
          <Post userimg="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=72ccac23-f971-49c1-9c3b-ea67aecb38d6" img="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176" name="Nisab Mohd" date="26-05-2022" caption=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fugiat debitis, fugit vitae velit dolore alias dolorem quas cupiditate tempore! dolore alias dolorem quas cupiditate tempore! 😊" />
          <Post userimg="https://cdn-images-1.listennotes.com/podcasts/coding-in-flow/branding-productivity-the-5q_l24sIO17-ctgXQhV5yHE.1400x1400.jpg" img="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/japan-tokyo-tower-night-little-japan.jpg" name="Philip Eric" date="23-05-2022" caption=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fugiat debitis, fugit vitae velit dolore alias dolorem quas cupiditate tempore! Mollitia nam cum consequatur amet tempore corporis odio corrupti blanditiis, illo quae sapiente debitis voluptatum!" />
        </div>
      </div>
      <div className="right_container">
        <Tags />
      </div>
    </div>
  )
}

export default Saved
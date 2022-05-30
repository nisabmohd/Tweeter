import React from 'react'
import Post from '../components/Post'
import Tags from '../components/Tags'

export default function Profile() {
    return (
        <div className='profile'>
            <div className="coverimage">
                <img style={{ width: '100%', height: '250px', objectFit: 'cover' }} src="https://goodmorningimagesforlover.com/wp-content/uploads/2018/11/create-facebook-cover-photo-for-whatsapp.jpg" alt="" />
            </div>
            <div className="container" style={{ marginTop: '-79px' }}>
                <div className="userdetails" style={{ background: 'white', borderRadius: '9px', padding: '12px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div className="leftimg" style={{ background: 'white', padding: '1.8px', marginTop: '-69px', borderRadius: '9px' }}>
                        <img style={{ width: '128px', borderRadius: '9px' }} src="https://cdn-images-1.listennotes.com/podcasts/coding-in-flow/branding-productivity-the-5q_l24sIO17-ctgXQhV5yHE.1400x1400.jpg" alt="" />
                    </div>
                    <div className="rightDetails" style={{ width: '100%' }}>
                        <div className="namefoll" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <div className="leftfolowers" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '36%' }}>
                                <h4 style={{}}>Phillip Lackner</h4>
                                <p style={{ fontSize: '11.785px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>1024</span> Following</p>
                                <p style={{ fontSize: '11.985px', }}><span style={{ color: 'black', fontWeight: 'bold' }}>29k</span> Followers</p>
                            </div>
                            <div className="rightfollowbtn" style={{ marginRight: '19px' }}>
                                <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '-13px' }}>Follow</button>
                            </div>
                        </div>
                        <div className="caption" style={{ width: '98%' }}>
                            <p style={{ fontSize: '12.85px', marginLeft: '15px', marginTop: '-2px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio molestiae voluptatum, natus atque deserunt quia odio eveniet odit cum expedita quisquam fugit blanditiis quo rem. Denmark 🏳️‍🌈</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="right_container" style={{marginLeft:'0'}}>
                    <Tags marginleft="0px" />
                </div>
                <div className="left_container" style={{marginLeft:'20px'}}>
                    <div className="posts">
                        <Post userimg="https://cdn-images-1.listennotes.com/podcasts/coding-in-flow/branding-productivity-the-5q_l24sIO17-ctgXQhV5yHE.1400x1400.jpg" name="Philip Lackner" date="26-05-2022" caption=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fugiat debitis, fugit vitae velit dolore alias dolorem quas cupiditate tempore! dolore alias dolorem quas cupiditate tempore! 😊" />
                        <Post userimg="https://cdn-images-1.listennotes.com/podcasts/coding-in-flow/branding-productivity-the-5q_l24sIO17-ctgXQhV5yHE.1400x1400.jpg" img="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/japan-tokyo-tower-night-little-japan.jpg" name="Philip Lackner" date="23-05-2022" caption=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fugiat debitis, fugit vitae velit dolore alias dolorem quas cupiditate tempore! Mollitia nam cum consequatur amet tempore corporis odio corrupti blanditiis, illo quae sapiente debitis voluptatum!" />
                    </div>
                </div>

            </div>
        </div>
    )
}

import React from 'react'

export default function whotofollow(props) {
    return (
        <div style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column', marginLeft: props.marginleft, marginTop: '19px' }}>
            <div className="header" style={{ width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', }}>Who to follow</h6>
            </div>
            <div className="userfollow" style={{borderTop: '1px solid #E0E0E0',}}>
                <div className="header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px' }}>
                    <div className="userimg">
                        <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2.8%' }} src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" alt="" />
                    </div>
                    <div className="username">
                        <h6 style={{ marginLeft: '9px', marginTop: '-0px' }}>Eric Warner</h6>
                        <p style={{ fontSize: '9px', marginTop: '-25px', marginLeft: '9px', color: '#828282' }}>1k followers</p>
                    </div>
                    <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginLeft: 'auto', marginTop: '-13px' }}>Follow</button>
                </div>
                <div className="bio">
                    <p style={{ fontSize: "11.25px", marginTop: '-2px' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam at iusto soluta iure recusandae minima porro nostrum nesciunt ea commodi?</p>
                </div>
            </div>
            <div className="userfollow" style={{borderTop: '1px solid #E0E0E0',}}>
                <div className="header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px' }}>
                    <div className="userimg">
                        <img style={{ width: '32px', borderRadius: '9px', marginLeft: '2.8%' }} src="https://cdn-images-1.listennotes.com/podcasts/coding-in-flow/branding-productivity-the-5q_l24sIO17-ctgXQhV5yHE.1400x1400.jpg" alt="" />
                    </div>
                    <div className="username">
                        <h6 style={{ marginLeft: '9px', marginTop: '-0px' }}>Philip Lackner</h6>
                        <p style={{ fontSize: '9px', marginTop: '-25px', marginLeft: '9px', color: '#828282' }}>12k followers</p>
                    </div>
                    <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginLeft: 'auto', marginTop: '-13px' }}>Follow</button>
                </div>
                <div className="bio">
                    <p style={{ fontSize: "11.25px", marginTop: '-2px' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam at iusto soluta iure recusandae minima porro nostrum nesciunt ea commodi?</p>
                </div>
            </div>
        </div>
    )
}

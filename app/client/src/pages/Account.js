import { TextField } from '@mui/material'
import React from 'react'

function Account(props) {
    return (
        <div className="container" style={{ marginTop: '29px', borderRadius: '9px', padding: '29px', backgroundColor: 'white', height: props.height }}>
            <div className="forms" style={{ margin: 'auto' }}>
                <div className="header">
                    <h3 style={{ marginTop: '-25px', marginBottom: '35px' }}>Edit profile</h3>
                </div>
                <div className="image" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img style={{ width: '45px', borderRadius: '9px', marginRight: '9px' }} src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg" alt="" />
                    <p style={{ fontSize: "13.5px" }}>Change Photo</p>
                </div>
                <div className="name">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Name</p>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value="Nisab Mohd"
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="email">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Email</p>
                    <TextField
                        type="email"
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value='nisab@yah00.in'
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="bio">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Bio</p>
                    <TextField
                        hiddenLabel
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        size="small"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit corrupti provident cum odio minus quo eius aperiam? Optio, repudiandae. Ad autem vel eligendi totam deleniti? Distinctio ut quos nihil architecto sunt officia possimus, excepturi sit quod commodi quae? Ipsam quo nihil ipsum sequi eos aspernatur."
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />

                </div>
                <div className="password">
                    <p style={{ fontSize: "13.5px", marginBottom: "5px" }}>Password</p>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value="nisab014587"
                        variant="outlined"
                        inputProps={{ style: { fontSize: '13.75px', fontFamily: 'Poppins' } }}
                        size="small"
                        style={{ width: '390px', fontSize: '12.5px' }}
                    />
                </div>
                <div className="btn">
                    <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '31px', width: '75px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginTop: '19px' }}>{props.btntext}</button>
                </div>
            </div>
        </div>
    )
}

export default Account
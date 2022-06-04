import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls'
import { Link } from 'react-router-dom'

export default function Whotofollow(props) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function getusers() {
            const res = await fetch(`${baseurl}/user/random/${props.uid}`)
            const data = await res.json()
            setUsers(data)
        }
        getusers()
    }, [])
    return (
        users.length?<div style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column', marginLeft: props.marginleft, marginTop: '19px' }
        }>
            <div className="header" style={{ width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', }}>Who to follow</h6>
            </div>
            {
                users.map(item => {
                    return <div key={item.uid} className="userfollow" style={{ borderTop: '1px solid #E0E0E0',marginLeft:'9px' }}>
                        <div className="header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px' }}>
                            <div className="userimg">
                                <Link to={`/user/${item.uid}`}><img style={{ width: '32px', borderRadius: '9px', marginLeft: '2.8%' }} src={item.userimg} alt="" /></Link>
                            </div>
                            <div className="username">
                                <h6 style={{ marginLeft: '9px', marginTop: '-0px' }}><Link to={`/user/${item.uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>{item.username}</Link></h6>
                                <p style={{ fontSize: '9px', marginTop: '-25px', marginLeft: '9px', color: '#828282' }}>{item.followers.length} followers</p>
                            </div>
                            {/* <button style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginLeft: 'auto', marginTop: '-13px' }}>view</button> */}
                        </div>
                        <div className="bio">
                            <p style={{ fontSize: "11.25px", marginTop: '2px', marginLeft: '2px' }}>{item.bio.length > 25 ? item.bio.slice(0, 25) + "..." : item.bio}</p>
                        </div>
                    </div>
                })
            }
        </div >:<></>
    )
}

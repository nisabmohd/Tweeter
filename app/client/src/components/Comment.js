import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseurl } from '../apicalls'

export default function Comment(props) {
    const[user,setuser]=useState(null)
    useEffect(()=>{
        async function getUserDetails() {
            const result = await fetch(`${baseurl}/user/${props.uid}`)
            const user = await result.json()
            setuser(user)
    
        }
        getUserDetails()
    },[])
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="user" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '15px' }}>
                <Link to={`/user/${props.uid}`} style={{ marginLeft: '2%' }}><img style={{ width: '32px', borderRadius: '9px' }} src={user?.userimg} alt="" /></Link>
                <div className="timeuser" style={{ display: 'flex', flexDirection: 'column', }}>
                    <h6 style={{ fontSize: '12px', margin: '0', marginLeft: '12px', width: 'fit-content' ,marginTop:'-15px'}}><Link to={`/user/${user?.uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user?.username}</Link></h6>
                </div>
            </div>
            <p style={{ marginLeft: '67.5px', fontSize: '11.5px',marginTop:'-15px' }}>{props.comment}</p>
        </div>
    )
}

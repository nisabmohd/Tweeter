import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseurl } from '../apicalls'

export default function Peoplecard(props) {
    const [doesfollow, setDoesfollow] = useState(false)
    useEffect(() => {

    }, [])
    async function handlefollow() {
        if (doesfollow) {
            const data = {
                uid: JSON.parse(localStorage.getItem('auth')).uid
            }
            fetch(`${baseurl}/user/unfollow/${props.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDoesfollow(false)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        } else {
            const data = {
                uid: JSON.parse(localStorage.getItem('auth')).uid
            }
            fetch(`${baseurl}/user/follow/${props.uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    setDoesfollow(true)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    return (
        <div key={props.uid} className="userfollow" style={{ borderTop: '1px solid #E0E0E0', marginLeft: '9px' }}>
            <div className="header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '19px' }}>
                <div className="userimg">
                    <Link to={`/user/${props.uid}`}><img style={{ width: '32px', borderRadius: '9px', marginLeft: '2.8%' }} src={props.userimg} alt="" /></Link>
                </div>
                <div className="username">
                    <h6 style={{ marginLeft: '9px', marginTop: '-0px' }}><Link to={`/user/${props.uid}`} style={{ textDecoration: 'none', color: 'inherit' }}>{props.username}</Link></h6>
                    <p style={{ fontSize: '9px', marginTop: '-25px', marginLeft: '9px', color: '#828282' }}>{props.followers.length} followers</p>
                </div>
                <button onClick={()=>handlefollow()} style={{ backgroundColor: '#2F80ED', color: 'white', border: 'none', outline: 'none', height: '27px', width: '70px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'Poppins', fontSize: '12px', marginLeft: 'auto', marginTop: '-13px' }}>{
                    doesfollow ? "Unfollow" : "Follow"
                }</button>
            </div>
            <div className="bio">
                <p style={{ fontSize: "11.25px", marginTop: '2px', marginLeft: '2px' }}>{props.bio.length > 25 ? props.bio.slice(0, 25) + "..." : props.bio}</p>
            </div>
        </div>
    )
}

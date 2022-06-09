import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls'
import Peoplecard from './Peoplecard'

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
        users.length?<div style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column', marginLeft: props.marginleft, marginTop: props.mtop,marginRight:props.marginRight }
        }>
            <div className="header" style={{ width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', }}>Who to follow</h6>
            </div>
            {
                users.map(item => {
                    return <Peoplecard key={item.uid} username={item.username} uid={item.uid} userimg={item.userimg} followers={item.followers} bio={item.bio} />
                })
            }
        </div >:<></>
    )
}

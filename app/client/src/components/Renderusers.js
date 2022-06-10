import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls';
import Customcarduser from './Customcarduser';
// import Peoplecard from './Peoplecard';

export default function Renderusers(props) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        async function getprofile() {
            const result = await fetch(`${baseurl}/user/${props?.uid}`)
            const data = await result.json()
            setUser(data)
        }
        getprofile()
    }, [props.uid])
    return (
        <div>{
            user ? <Customcarduser width='370px' username={user.username} uid={user.uid} userimg={user.userimg} followers={user.followers} bio={user.bio} />:<></>
        }</div>
    )
}

import React, { useEffect, useState } from 'react'
import { baseurl } from '../apicalls'
import Renderusers from './Renderusers'

export default function Following(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getprofile() {
      const result1 = await fetch(`${baseurl}/user/${props.uid}`)
      const data1 = await result1.json()
      setUsers(data1.following)
    }
    console.log(props);
    getprofile()
  }, [])
  return (
    <>
      {
        users.length !== 0 ?
          users.map(item => <Renderusers profilefollowing={props.profilefollowing} foll={props.foll} key={item} specific={props.specific} uid={item} />)
          : <></>
      }
    </>
  )
}

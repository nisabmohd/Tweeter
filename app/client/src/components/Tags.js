import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseurl } from '../apicalls'
export default function Tags(props) {
    const [top, setTop] = useState([])
    useEffect(() => {
        async function getTop() {
            const res = await fetch(`${baseurl}/post/top/hashtag`)
            const data = await res.json()
            setTop(data)
        }
        getTop()
    }, [])
    return (
        <div className='tags' style={{ backgroundColor: 'rgb(33 35 36)', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column', marginLeft: props.marginleft }}>
            <div className="header" style={{ borderBottom: '1px solid #383636', width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12.55px', color:'rgb(218, 218, 218)'}}>Trends for you</h6>
            </div>
            <div className="hashtags">
                {
                    top.map(item => {
                        return <Link key={item._id} to={`/search/${item.tag}`} style={{textDecoration:'none',color:'inherit'}} ><div className="ptag" style={{ marginLeft: '15px' }}>
                            <h6 style={{ fontSize: '12.55px', marginTop: '19px',color:'#f6f6f6' }}>#{item.tag}</h6>
                            <p style={{ fontSize: '10.8px', marginTop: '-26px', color: 'rgb(218, 218, 218)' }}>{item.count} tweets</p>
                        </div>
                        </Link>
                    })
                }


            </div>

        </div>
    )
}

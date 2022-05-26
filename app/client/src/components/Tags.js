import React from 'react'

export default function Tags() {
    return (
        <div className='tags' style={{ backgroundColor: 'white', padding: '11px', borderRadius: '9px', display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
            <div className="header" style={{ borderBottom: '1px solid #E0E0E0', width: '96.25%', margin: 'auto' }}>
                <h6 style={{ margin: '8px', marginTop: '4px', marginBottom: '8px', fontSize: '12px', }}>Trends for you</h6>
            </div>
            <div className="hashtags">
                <div className="ptag" style={{marginLeft:'15px'}}>
                    <h6 style={{ fontSize: '11.55px',marginTop:'19px' }}>#Virat Kohli</h6>
                    <p style={{fontSize:'10px',marginTop:'-19px',color:'#828282'}}>90k tweets</p>
                </div>
                <div className="ptagg" style={{marginLeft:'15px'}}>
                    <h6 style={{ fontSize: '11.55px',marginTop:'19px' }}>#Wah Modiji</h6>
                    <p style={{fontSize:'10px',marginTop:'-19px',color:'#828282'}}>1k tweets</p>

                </div>
                <div className="ptagg" style={{marginLeft:'15px'}}>
                    <h6 style={{ fontSize: '11.55px',marginTop:'19px' }}>#Dani</h6>
                    <p style={{fontSize:'10px',marginTop:'-19px',color:'#828282'}}>12k tweets</p>

                </div>
                <div className="ptagg" style={{marginLeft:'15px'}}>
                    <h6 style={{ fontSize: '11.55px',marginTop:'19px' }}>#Johny</h6>
                    <p style={{fontSize:'10px',marginTop:'-19px',color:'#828282'}}>79 tweets</p>

                </div>
                <div className="ptagg" style={{marginLeft:'15px'}}>
                    <h6 style={{ fontSize: '11.55px',marginTop:'19px' }}>#Hyderabad</h6>
                    <p style={{fontSize:'10px',marginTop:'-19px',color:'#828282'}}>1k tweets</p>

                </div>
            </div>

        </div>
    )
}

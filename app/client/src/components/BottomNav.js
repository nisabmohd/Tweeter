import React from 'react'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function BottomNav() {
    return (
        <div className="bottomnavbar">
            <div className='bottomnav navtags'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}><HomeIcon /></NavLink>
                <NavLink to="/explore" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}><ExploreIcon /></NavLink>
                <NavLink to="/saved" className={({ isActive }) => isActive ? 'tagstyle active' : 'tagstyle'}><BookmarkIcon /></NavLink>
            </div>
        </div>
    )
}

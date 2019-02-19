import React from 'react'
import {Link} from 'react-router-dom'
const Nav = ()=>{
    return (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/buyers'>Buyers</Link></li>
            <li><Link to='/tasks'>Tasks</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
        </ul>
    )
}
export default Nav
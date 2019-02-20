import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'
const Nav = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/buyers'>Buyers</Link></li>
            <li><Link to='/tasks'>Tasks</Link></li>
            <li><Link to={signInStatus.isSignIn?`/profile/${signInStatus.username}`:'/profile'}>Profile</Link></li>
        </ul>
    )
}
export default Nav
import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'
const Nav = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm col-md-8">
            <Link className='navbar-brand' to='/'>WITB</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav ">
            <Link className="nav-item nav-link" to='/'>Home</Link>
            <Link className="nav-item nav-link" to='/buyers'>Buyers</Link>
            <Link className="nav-item nav-link" to='/tasks'>Tasks</Link>
            <Link className="nav-item nav-link" to={signInStatus.isSignIn?`/profile/${signInStatus.username}`:'/profile'}>Profile</Link>
            </div>
            </div>
        </nav>
    )
}
export default Nav
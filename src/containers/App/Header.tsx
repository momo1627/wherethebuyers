import * as React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'

import './style.css'
const Header = () => {
  const { signInStatus } = React.useContext(SignInStatus);
  const [nav, setNav] = React.useState(false);
  const [user, setUser] = React.useState(false)
  const ShowNav = () => {
    setNav((prev) => !prev)
  }
  const showUser = () => {
    setUser(prev => !prev);
  }
  const hideUser = () => {
    setUser(false);
    setNav(false);
  }
  return (
    <div className='fixed-top bg-white border-bottom border-muted'>
      <nav className="header-container navbar-light px-2 d-flex justify-content-between align-items-center">
        <div className='col-10 col-sm-4 d-flex justify-content-between align-items-center'>
          <Link to='/' className=' text-info text-decoration-none' onClick={hideUser}>WTB</Link>
          <ModalButton target={signInStatus.isSignIn ? "postATask" : "signIn"}><span className='post-button p-1' onClick={hideUser}>Post A Task</span></ModalButton>
        </div>
        <div className='d-sm-none'>
          <button className="border rounded  navbar-toggler-icon" onClick={ShowNav}></button>
        </div>
        {nav && <div className='nav-container d-sm-none'>
          <Nav user={user} showUser={showUser} hideUser={hideUser}/>
        </div>}
        <div className='d-none d-sm-flex col justify-content-between position-relative'>
          <Nav user={user} showUser={showUser} hideUser={hideUser}/>
        </div>
      </nav>
    </div>

  )
}
export default Header
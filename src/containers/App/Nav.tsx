import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'
import SignOut from '../../components/UserAdmin/SignOut'

const Nav = () => {
  const { signInStatus } = React.useContext(SignInStatus)
  return (
    <>
      <div className="" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <NavLink activeClassName='nav-link-active' className="nav-list-item text-decoration-none" to='/tasks' >Browse Tasks</NavLink>
      </div>
      <div className="" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        {signInStatus.isSignIn && <NavLink activeClassName='nav-link-active' className="nav-list-item text-decoration-none" to='/mytasks'>MyTasks</NavLink> }
      </div>
      <div className='d-none d-md-block nav-list-item'>
        <ModalButton target={signInStatus.isSignIn ? "postATask" : "signIn"}><span className='post-button py-1 px-2'>Post A Task</span></ModalButton>
      </div>
      {signInStatus.isSignIn && <div className="nav-list-item" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        {signInStatus.username}
      </div>}
      {signInStatus.isSignIn && <div className="nav-list-item" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <SignOut />
      </div>}
      {!signInStatus.isSignIn && <div className="nav-list-item" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <ModalButton target="signIn">Sign In</ModalButton>
      </div>}
      {!signInStatus.isSignIn && <div className="nav-list-item" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <ModalButton target="signUp">Sign Up</ModalButton>
      </div>}
    </>

  )
}
export default Nav
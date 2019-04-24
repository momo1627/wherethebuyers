import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'
import SignOut from '../../components/UserAdmin/SignOut'
interface Iprop {
  hideNav: () => void;
}

const Nav = (props: Iprop) => {
  const { signInStatus } = React.useContext(SignInStatus);
  const hideNav = () => {
    props.hideNav();
  }
  return (
    <>
      <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" to='/tasks' onClick={hideNav} >Browse Tasks</NavLink>
      {signInStatus.isSignIn &&
        <div className='d-flex flex-column d-sm-none'>
          <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideNav} to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
          <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideNav} to='/mytasks'>MyTasks</NavLink>
          <SignOut />
        </div>
      }
      {signInStatus.isSignIn ?
        <div className='nav-user-container'>
          <div className="nav-list-item px-2 d-none d-sm-block"  >{signInStatus.username}</div>
          <div className='nav-user-dropdown border-top-0 border-muted shadow-sm '>
            <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
            <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" to='/mytasks'>MyTasks</NavLink>
            <SignOut />
          </div>
        </div>
        :
        <div>
          <div className='nav-list-item ' onClick={hideNav}>
            <ModalButton target="signIn"><span className="px-2" >Sign In</span></ModalButton>
          </div>
          <div className='nav-list-item ' onClick={hideNav}>
            <ModalButton target="signUp"><span className="px-2" >Sign Up</span></ModalButton>
          </div>
        </div>
      }


    </>

  )
}
export default Nav
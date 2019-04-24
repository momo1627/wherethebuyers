import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'
import SignOut from '../../components/UserAdmin/SignOut'
interface Iprop {
  hideNav: () => void
}
const Nav = (props: Iprop) => {
  const { signInStatus } = React.useContext(SignInStatus);
  const [user, setUser] = React.useState(false)
  const showUser = () => {
    setUser(prev => !prev);
  }
  const hideUser = () => {
    setUser(false);
    props.hideNav();
  }
  return (
    <>
      <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" to='/tasks' onClick={hideUser} >Browse Tasks</NavLink>
      {signInStatus.isSignIn ?
        <>
          <div className="nav-list-item px-2 d-none d-sm-block" onClick={showUser}>{signInStatus.username}</div>
          <div className="nav-list-item px-2  d-sm-none">{signInStatus.username}</div>
          <div className='d-flex flex-column d-sm-none'>
            <NavLink activeClassName='' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
            <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to='/mytasks'>MyTasks</NavLink>
            <SignOut />
          </div>
        </>
        :
        <div>
          <ModalButton target="signIn"><span className="nav-list-item px-2" onClick={hideUser}>Sign In</span></ModalButton>
          <ModalButton target="signUp"><span className="nav-list-item px-2" onClick={hideUser}>Sign Up</span></ModalButton>
        </div>
      }
      {signInStatus.isSignIn && user &&
        <div className='nav-user-container d-flex flex-column'>
          <NavLink activeClassName='' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
          <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to='/mytasks'>MyTasks</NavLink>
          <SignOut />
        </div>
      }

    </>

  )
}
export default Nav
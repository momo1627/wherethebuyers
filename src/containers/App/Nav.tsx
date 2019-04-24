import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'
import SignOut from '../../components/UserAdmin/SignOut'
interface Iprop {
  showUser:()=>void;
  hideUser:()=>void;
  user:boolean;
}

const Nav = (props: Iprop) => {
  const { signInStatus } = React.useContext(SignInStatus);
  const user = props.user
  const showUser = ()=>{
    props.showUser();
  }
  const hideUser = ()=>{
    props.hideUser();
  }
  return (
    <>
      <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" to='/tasks' onClick={hideUser} >Browse Tasks</NavLink>
      {signInStatus.isSignIn ?
        <>
          <div className="nav-list-item px-2 d-none d-sm-block" onClick={showUser} >{signInStatus.username}</div>
          <div className='d-flex flex-column d-sm-none'>
            <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
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
        <div className='nav-user-container border-top-0 border-muted shadow-sm d-none d-sm-flex flex-column '>
          <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to={`/profile/${signInStatus.userId}`}>View Profile</NavLink>
          <NavLink activeClassName='nav-link-active' className="px-2 nav-list-item text-decoration-none" onClick={hideUser} to='/mytasks'>MyTasks</NavLink>
          <SignOut />
        </div>
      }

    </>

  )
}
export default Nav
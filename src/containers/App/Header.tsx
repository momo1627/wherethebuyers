import * as React from 'react'
import Nav from './Nav'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus } from '../../context/context'

import './style.css'
const Header = () => {
  const { signInStatus } = React.useContext(SignInStatus)
  return (
    <div className='fixed-top bg-white border-bottom border-muted'>
      <nav className="header-container navbar-light px-2">
        <div className='d-md-none d-flex justify-content-between'>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='d-md-none nav-list-item '>
            <ModalButton target={signInStatus.isSignIn ? "postATask" : "signIn"}> <span className='post-button  py-1 px-2'>Post A Task</span></ModalButton>
          </div>
        </div>
        <div className="d-md-none collapse" id="navbarNav">
            <ul className="navbar-nav justify-content-between">
              <Nav />
            </ul>
          </div>
        <div className='d-none w-100 d-md-flex justify-content-between'>
          <div className="nav-list-item nav-list-brand" >WTB</div>
          <Nav />
        </div>

      </nav>
    </div>

  )
}
export default Header
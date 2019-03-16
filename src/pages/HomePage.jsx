import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {SignInStatus} from '../middleware/context'
import ModalButton from '../components/PostButton'
const Home = ()=>{
    const [signInStatus] = useContext(SignInStatus)
    return (
        <div className='container'>
        <div>
            {signInStatus.isSignIn?
                <div className='h4'>{`Post a Task`}</div>:'Please Sign In first or Sign Up'}
        </div>
        <div>
            {signInStatus.isSignIn ? 
                <ModalButton target="postATask">Post A Task</ModalButton> :
                <div className="btn-group py-2">
                  <ModalButton target="signIn">Sign In</ModalButton>
                  <ModalButton target="signUp">Sign Up</ModalButton>
                </div>
            }  
        </div>
        </div>
    )
}
export default Home
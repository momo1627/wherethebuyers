import * as React from 'react'
import {SignInStatus} from '../middleware/context'
import ModalButton from '../components/ModalButton'
const Home:React.FunctionComponent = ()=>{
    const {signInStatus} = React.useContext(SignInStatus)
    return (
        <div className='container'>
        <div>
            {signInStatus.isSignIn?
                <div className='h4'>{`Post a Task`}</div>:'Please Sign In first or Sign Up'}
        </div>
        <div>
            {/* {signInStatus.isSignIn ?  */}
                <ModalButton target="postATask">Post A Task</ModalButton> 
                {/* :
                <div className="btn-group py-2">
                  <ModalButton target="signIn">Sign In</ModalButton>
                  <ModalButton target="signUp">Sign Up</ModalButton>
                </div> */}
            }  
        </div>
        </div>
    )
}
export default Home
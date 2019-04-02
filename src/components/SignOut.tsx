import * as React from 'react'
import { SignInStatus } from '../middleware/context';
import {signOutAction} from '../middleware/actions/signInAction'
const SignOut:React.FunctionComponent = ()=>{
    const {signInStatus,signInDispatch} = React.useContext(SignInStatus)
    const handleSignOut = async ()=>{
        const result = await fetch('http://ec2-3-89-33-101.compute-1.amazonaws.com/sign-out',{credentials:"include"})
    }
    return (
        <div style={{"maxWidth":"240px"}} className="col-6 col-md-4 col-lg-4 btn-group px-1">
            <button className='btn btn-sm btn-info p-1'>{signInStatus.username}</button>
            <button className='btn btn-sm btn-info p-1' onClick={()=>{handleSignOut();signInDispatch(signOutAction)}}>SignOut</button>
        </div>
    )
}
export default SignOut

import React,{useContext} from 'react'
import { SignInStatus } from '../middleware/context';
import {signOutAction} from '../middleware/actions/signInAction'
const SignOut = ({location})=>{
    const [signInStatus,dispatch] = useContext(SignInStatus)
    return (
        <div style={{"maxWidth":"240px"}} className="col-6 col-md-4 col-lg-4 btn-group px-1">
        <button className='btn btn-sm btn-info p-1'>{signInStatus.username}</button>
        <button className='btn btn-sm btn-info p-1' onClick={()=>{dispatch(signOutAction)}}>SignOut</button>
        </div>
    )
}
export default SignOut

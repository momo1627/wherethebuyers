import React,{useContext} from 'react'
import { SignInStatus } from '../middleware/context';
import {signOutAction} from '../middleware/actions/signInAction'
const SignOut = ({location})=>{
    const [signInStatus,dispatch] = useContext(SignInStatus)
    return (
        <div className="col-md-3 btn-group">
        <button className='btn btn-secondary py-0'>{signInStatus.username}</button>
        <button className='btn btn-secondary py-0' onClick={()=>{dispatch(signOutAction)}}>SignOut</button>
        </div>
    )
}
export default SignOut

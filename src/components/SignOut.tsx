import * as React from 'react'
import { SignInStatus } from '../middleware/context';
import {signOutAction} from '../middleware/actions/signInAction'
const SignOut:React.FunctionComponent = ()=>{
    const {signInStatus,signInDispatch} = React.useContext(SignInStatus)
    const handleSignOut = async ()=>{
<<<<<<< HEAD
        const result = await fetch('http://localhost:5000/sign-out',{credentials:"include"})
=======
        const result = await fetch('http://ec2-3-89-33-101.compute-1.amazonaws.com/sign-out',{credentials:"include"})
>>>>>>> bdaf4f1a805d21247ee5e34b2030a41424cca87c
    }
    return (
        <div style={{"maxWidth":"240px"}} className="col-6 col-md-4 col-lg-4 btn-group px-1">
            <button className='btn btn-sm btn-info p-1'>{signInStatus.username}</button>
            <button className='btn btn-sm btn-info p-1' onClick={()=>{handleSignOut();signInDispatch(signOutAction)}}>SignOut</button>
        </div>
    )
}
export default SignOut

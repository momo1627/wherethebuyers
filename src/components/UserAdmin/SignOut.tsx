import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { SignInStatus } from '../../context/context';
import { signOutAction } from '../../actions/signInAction'
import API_Url from '../../constants/api'
const SignOut: React.FunctionComponent = () => {
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus)
    const handleSignOut = async () => {
        const result = await fetch(`${API_Url}/user`, { method: 'post', body: JSON.stringify({ action: 'signOut' }), headers: { 'Content-Type': 'application/json' }, credentials: "include" })
        signInDispatch(signOutAction)
        window.location.href = '/'
    }
    return (
        <span className='nav-list-item px-2' onClick={handleSignOut}>SignOut</span>
    )
}
export default SignOut

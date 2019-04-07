import * as React from 'react'
import {SignInAction,} from './reducers/signInReducer'
import {UpdateAction} from './reducers/updateReducer'
import {ToggleModalAction} from './reducers/showModalReducer'
const signInStatus = {
    username:'',
    isSignIn:false,
    userId:''
}
const signInDispatch:React.Dispatch<SignInAction> = ()=>{}  
const SignInStatus = React.createContext({signInStatus,signInDispatch })
const updateDispatch:React.Dispatch<UpdateAction> = ()=>{}
const modalDispatch:React.Dispatch<ToggleModalAction> = ()=>{}
const update = false
const modalStatus = {
    status:false,
    modal:''
}
const Update = React.createContext({update,updateDispatch})
const ToggleModal = React.createContext({modalStatus,modalDispatch})
export {SignInStatus,Update,ToggleModal}
// export {Update,ToggleModal}


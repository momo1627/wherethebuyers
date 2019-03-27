import * as React from 'react'
import axios from 'axios'
import {SignInStatus,ToggleModal} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
import {showModal,hideModal} from '../middleware/actions/showModalAction'
import useGetData from '../middleware/customHooks/useGetData'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import ModalButton from './ModalButton'
import FormModal from './FormModel'
type AccontInput = {
    username:string;
    password:string;
}
type Props = {
    target:string;
    title:string;
}
const UserAccount:React.FunctionComponent<Props> =(props)=>{
    const {signInStatus,signInDispatch} = React.useContext(SignInStatus);
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    const [alert,setAlert] = React.useState({status:2,message:''})
    const [input,handleChange,setInput] = useChangeInput<AccontInput>({
        username:'',
        password:'',
    });
    const handleSignIn = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        axios.post(
            `http://localhost:5000/sign-in`,input
          ).then((res)=>{return res.data}).then(response=>{
            if(response.status === 0 ){
                const username = response.data.username
                signInDispatch(signInAction(username as string));
                setAlert({status:response.status,message:`welcome ${username}`})
                // modalDispatch(hideModal(props.target))
            } else{
                setAlert({status:response.status,message:response.message})
                return
            }
          })
        
    }
    const handleSignUp = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        const newUser = {...input,signUpTime:new Date().toLocaleString()}
        axios.post(
            `http://localhost:5000/sign-up`,newUser
          ).then((res)=>{return res.data}).then(response=>{
            if(response.status === 0 ){
                const username = response.data.username
                signInDispatch(signInAction(username as string));
                setAlert({status:response.status,message:`welcome ${username}`})
                // modalDispatch(hideModal(props.target))
            } else{
                setAlert({status:response.status,message:response.message})
            }
          })
    }
    
    return (
        <div className="post-task-content mx-auto bg-white p-3">
            <h3 className="text-center">{props.title}</h3>
            <form action="">
                <FormGroup input={input.username} change={handleChange} content="username" type='text'>We'll never share your email with anyone else.</FormGroup>
                <FormGroup input={input.password} change={handleChange} content="password" type='password'>We'll never share your password with anyone else.</FormGroup>
                <div className='d-flex justify-content-between p-0'>
                    <button className='btn btn-primary btn-sm' type="submit" onClick={props.target === 'signIn' ? handleSignIn : handleSignUp}>Submit</button>
                    <button className='btn btn-danger btn-sm' type="button" onClick={()=>{modalDispatch(hideModal(props.target))}}>Cancel</button>
                </div>
                <hr/>
                <div className='d-flex justify-content-between p-0'>
                    <div>{props.target === 'signIn' ? "Don't have an account?" : "Already have an account"}</div>
                    <ModalButton target={props.target === 'signIn' ? "signUp" : "signIn"}>{props.target === 'signIn' ? "Sign Up" : "Sign In"}</ModalButton>
                </div>
            </form>
            {alert.status === 0 && <FormModal message={alert.message} cancel={()=>{setAlert({status:0,message:''});modalDispatch(hideModal(props.target))}}/>}
            {alert.status === 1 && <FormModal message={alert.message} cancel={()=>{setAlert({status:0,message:''});setInput({username:'',password:''})}}/>}
        </div>
        
    )
}
export default UserAccount
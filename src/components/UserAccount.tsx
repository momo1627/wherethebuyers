import * as React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import {SignInStatus,ToggleModal} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
import {showModal,hideModal} from '../middleware/actions/showModalAction'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import ModalButton from './PostButton'
type AccontInput = {
    username:string;
    password:string;
}
type Props = {
    target:string;
    title:string;
}
let schema = yup.object().shape({
    username:yup.string().min(8).email().required().label("username is email address"),
    password:yup.string().min(8).required().label("password at least 8 length")
})
const UserAccount =(props:Props)=>{
    const {signInStatus,signInDispatch} = React.useContext(SignInStatus);
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    const [input,handleChange] = useChangeInput<AccontInput>({
        username:'',
        password:'',
    });
    const handleSignIn = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        schema.validate(input).then(()=>{
            axios.get(
                `http://localhost:5000/profile/${input.username}`,
              ).then((response)=>{
                  if(response.status === 200){
                    signInDispatch(signInAction(input.username));
                    modalDispatch(hideModal(props.target))
                  } 
            })
        },err=>{
            err.name;
            err.errors
            window.alert('error');
            return 
        })
        
    }
    const handleSignUp = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        schema.validate(input).then(()=>{
            const newUser = input
            axios.get(`http://localhost:5000/profile/${newUser.username}`,)
            .then(()=>{
                    signInDispatch(signInAction(input.username));
                    modalDispatch(hideModal(props.target))})
            .catch(()=>{
                axios.post(
                    `http://localhost:5000/profile`,newUser
                ).then(()=>{
                    signInDispatch(signInAction(newUser.username));
                    modalDispatch(hideModal(props.target))
                    })
            })
        },err=>{
            err.name;
            err.errors
            window.alert('error');
            return 
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
        </div>
        
    )
}
export default UserAccount
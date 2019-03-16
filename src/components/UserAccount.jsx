import React,{useState,useContext} from 'react'
import axios from 'axios'
import {SignInStatus,ToggleModal} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
import {showModal,hideModal} from '../middleware/actions/showModalAction'
import FormGroup from '../components/FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import ModalButton from './PostButton'

const UserAccount =(props)=>{
    const [signInStatus,signInDispatch] = useContext(SignInStatus);
    const [modalStatus,modalDispatch] = useContext(ToggleModal)
    const handleSignIn = (e)=>{
        e.preventDefault();
        for (let i in input){
            if(input[i] === ''){
                return false
            }
        }
        axios.get(
            `http://localhost:5000/profile/${input.username}`,
          ).then((response)=>{
              if(response.status === 200){
                signInDispatch(signInAction(input.username));
                modalDispatch(hideModal(props.target))
              } 
        })
    }
    const handleSignUp = (e)=>{
        e.preventDefault()
        for (let i in input){
            if(input[i] === ''){
                return false
            }
        }
        const newUser = {id:input.username,...input}
        axios.get(
            `http://localhost:5000/profile/${newUser.id}`,
          ).then(()=>{
                signInDispatch(signInAction(input.id));
                modalDispatch(hideModal(props.target))})
          .catch(()=>{
            axios.post(
                `http://localhost:5000/profile`,newUser
              ).then(()=>{
                signInDispatch(signInAction(newUser.id));
                modalDispatch(hideModal(props.target))
                })
          })
    }
    const [input,handleChange] = useChangeInput({
        username:'',
        password:'',
    });
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
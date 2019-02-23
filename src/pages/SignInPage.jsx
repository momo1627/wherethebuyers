import React,{useState,useContext} from 'react'
import axios from 'axios'
import {SignInStatus} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
import FormGroup from '../components/FormGroup'
import Button from '../components/Button'
import useChangeInput from '../middleware/customHooks/useChangeInput'

const SignIn =(props)=>{
    const [signInStatus,dispatch] = useContext(SignInStatus);
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.get(
            `http://localhost:5000/profile/${input.username}`,
          ).then((response)=>{
              if(response.status === 200){
                dispatch(signInAction(input.username));
                props.history.push(`/profile/${input.username}`)
              } 
        }).catch((e)=>{
            props.history.push(`/signup`)  
        })
    }
    const [input,handleChange] = useChangeInput({
        username:'',
        password:'',
    });
    return (
        <div className="container">
            <h3>Welcome to WhereIsTheBuyers</h3>
            <form action="">
                <FormGroup input={input.username} change={handleChange} content="username" type='text'>We'll never share your email with anyone else.</FormGroup>
                <FormGroup input={input.password} change={handleChange} content="password" type='password'>We'll never share your password with anyone else.</FormGroup>
                <Button type='submit' buttonStyle='btn btn-primary' click={handleSubmit}>Sign In</Button>
            </form>
        </div>
        
    )
}
export default SignIn
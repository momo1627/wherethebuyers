import React, {useContext,useState} from 'react'
import axios from 'axios'
import {SignInStatus} from '../middleware/context'
import {signInAction} from '../middleware/actions/signInAction';
import FormGroup from '../components/FormGroup'
import Button from '../components/Button'
import useChangeInput from '../middleware/customHooks/useChangeInput'
const SignUp = (props)=>{
    const [input,handleChange] = useChangeInput({
        username:'',
        password:'',
        password_confirm:'',
        email:'',
        phone:'',
    })
    const [signInStatus,dispatch] = useContext(SignInStatus);
    const handleSubmit = (e)=>{
        e.preventDefault()
        for (let i in input){
            if(input[i] === ''){
                return false
            }
        }
        const newUser = {id:input.username,...input}
        axios.get(
            `http://localhost:5000/profile/${newUser.id}`,
          ).then(()=>{props.history.push('/signin')})
          .catch(()=>{
            axios.post(
                `http://localhost:5000/profile`,newUser
              ).then(()=>{
                  dispatch(signInAction(newUser.id));
                  props.history.push(`/profile/${newUser.id}`
            )})
          })
    }
    return (
        <div className="container">
            <h3>Join WITB Life </h3>
            {/* {isSigned && <h5>username is already signed, please go to signin</h5>} */}
            <div>
                <form action="">
                    <FormGroup size='sm' type='email' input={input.email} content='email' change={handleChange} >must contains letters and numbers</FormGroup>
                    <FormGroup size='sm' type='text' input={input.username} content='username' change={handleChange} >must contains letters and numbers</FormGroup>
                    <FormGroup size='sm' type='password' input={input.password} content='password' change={handleChange} >must contains letters and numbers</FormGroup>
                    <FormGroup size='sm' type='password' input={input.password_confirm} content='password_confirm' change={handleChange} >must contains letters and numbers</FormGroup>
                    <FormGroup size='sm' type='text' input={input.phone} content='phone' change={handleChange} >must contains letters and numbers</FormGroup>
                    <Button click={handleSubmit} type='submit' buttonStyle='btn btn-primary'>Submit</Button>
            </form>
            </div>
        </div>
    )
}
export default SignUp
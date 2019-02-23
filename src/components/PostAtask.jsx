import React, {useState,useContext}from 'react'
import axios from 'axios'
import {SignInStatus} from '../middleware/context'
import FormGroup from '../components/FormGroup'
import Button from '../components/Button'
import useChangeInput from '../middleware/customHooks/useChangeInput'
const PostAtask = ()=>{
    const [signInStatus,] = useContext(SignInStatus)
    const [input,handleChange,setInput] = useChangeInput({
        price:'',
        what:'',
        where:'',
        when:'',
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        for (let i in input){
            if(input[i] === ''){
                return false
            }
        }
        const task = {
            id:new Date().getTime().toString(),
            poster:signInStatus.username,
            time:new Date().toLocaleString(),
            ...input,
            status:'OPEN',
            assignTo:'not assigned'
        }
        axios.post('http://localhost:5000/tasks', task)
        setInput({
            price:'',
            what:'',
            where:'',
            when:''
        })
        
    }
    return(
        <div>
        <form action="">
            <FormGroup type='text' change={handleChange} content='what' input={input.what}>What do you want to buy</FormGroup>
            <FormGroup type='text' change={handleChange} content='price' input={input.price}>How much do you pay</FormGroup>
            <FormGroup type='text' change={handleChange} content='where' input={input.where}>Where are you</FormGroup>
            <FormGroup type='text' change={handleChange} content='when' input={input.when}>When do you need to deliver</FormGroup>
            <Button type='submit' buttonStyle='btn btn-primary' click={handleSubmit}>Post A Task</Button>
        </form>
        </div>
        
    )
}
export default PostAtask
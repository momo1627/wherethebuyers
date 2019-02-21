import React, {useState,useContext}from 'react'
import axios from 'axios'
import {SignInStatus} from '../middleware/context'

const PostAtask = ()=>{
    const [signInStatus,] = useContext(SignInStatus)
    const [input,setInput] = useState({
        price:'',
        what:'',
        where:'',
        when:'',
    })
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        const newState = {
            [name]:value
        }
        setInput((prevState)=>{return {...prevState,...newState }})
    }
    const handleSubmit = async ()=>{
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
            status:'Finding'
        }
        axios.post('http://localhost:4000/tasks', task)
        setInput({
            price:'',
            what:'',
            where:'',
            when:''
        })
        
    }
    return(
        <div>
            <h3>Post A task</h3>
        <form action="">
            <label htmlFor="price">Price for Task</label>
            <input type="text" name='price' value={input.price} onChange={handleChange}/><br/>
            <label htmlFor="what">What to Buy</label>
            <input type="text" name='what' value={input.what} onChange={handleChange}/><br/>
            <label htmlFor="where">where to deliver</label>
            <input type="text" name='where' value={input.where} onChange={handleChange}/><br/>
            <label htmlFor="when">due time</label>
            <input type="text" name='when' value={input.when} onChange={handleChange}/><br/>
            <input type="button" value='Post' onClick={handleSubmit}/>
        </form>
        </div>
        
    )
}
export default PostAtask
import React, {useState,useContext}from 'react'
import axios from 'axios'
import {SignInStatus, ToggleModal} from '../middleware/context'
import FormGroup from '../components/FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import {hideModal} from '../middleware/actions/showModalAction'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import {Update} from '../middleware/context'
const PostAtask = ()=>{
    const [signInStatus,] = useContext(SignInStatus)
    const [modalStatus,modalDispatch] = useContext(ToggleModal)
    const [update,updateDispatch] = useContext(Update)

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
        if(update) {updateDispatch(endUpdate)}
        await axios.post('http://localhost:5000/tasks', task)
        setInput({
            price:'',
            what:'',
            where:'',
            when:''
        })
        modalDispatch(hideModal)
        updateDispatch(startUpdate)
    }
    return(
        <div className='post-task-content mx-auto bg-white p-3'>
            <h5 className="text-center">Post A Task</h5>
            <form action="" className='px-3' >
            <FormGroup type='text' size="small" change={handleChange} content='what' input={input.what}>What do you want to buy</FormGroup>
            <FormGroup type='text' size="small" change={handleChange} content='price' input={input.price}>How much do you pay</FormGroup>
            <FormGroup type='text' size="small" change={handleChange} content='where' input={input.where}>Where are you</FormGroup>
            <FormGroup type='text' size="small" change={handleChange} content='when' input={input.when}>When do you need to deliver</FormGroup>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary' type="submit" onClick={handleSubmit}>Submit</button>
                <button className='btn btn-danger' type="button" onClick={()=>{modalDispatch(hideModal('postATask'))}}>Cancel</button>
            </div>  
            </form>
            
        </div>
        
    )
}
export default PostAtask
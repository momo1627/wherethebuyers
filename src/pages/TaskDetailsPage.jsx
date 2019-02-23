import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import TaskContent from '../components/TaskContent'
import {SignInStatus,Update} from '../middleware/context'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import useGetData from '../middleware/customHooks/useGetData'
const TaskDetail = (props)=>{
    const [signInStatus] = useContext(SignInStatus)
    const [data,dispatch] = useGetData({},`http://localhost:5000/tasks/${props.match.params.id}`)
    const handleSubmit = async()=>{
        const input = {assignTo:signInStatus.username,status:'ASSIGNED'}
        await axios.patch(`http://localhost:5000/tasks/${props.match.params.id}`,input)
        dispatch(startUpdate)
    }
    return (
        <div>
            <div className='row ml-1 p-2 bg-white'> 
            <div className="col-8">
                <div className='row justify-content-around'>
                    <div className="px-2 border rounded text-white bg-success">{data.status}</div>
                </div>
                <div className="py-3 h3 font-weight-normal">{data.what}</div>
                <TaskContent content={data.poster}>Posted by</TaskContent>
                <TaskContent content={data.where}>Location</TaskContent>
                <TaskContent content={data.when}>Due</TaskContent>
                <TaskContent content={data.time}>Post Time</TaskContent>
            </div>
            <div className="col-4 py-3 text-center  border border-secondary rounded align-self-start">
                <h6 className='py-2'>Task Budget</h6>
                <div className='py-3 display-4'>${data.price}</div>
                <button className='btn btn-success' onClick={handleSubmit} disabled={data.status==='ASSIGNED'}>Take the Task</button>
                <TaskContent content={data.status==='ASSIGNED'?data.assignTo:''}>Assigned To</TaskContent>
            </div>
                <TaskContent content={data.detail}>Detail</TaskContent>
            </div>
        </div>

    )
}
export default TaskDetail
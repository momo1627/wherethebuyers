import * as React from 'react'
import axios from 'axios'
import TaskContent from '../components/TaskContent'
import ModalButton from '../components/PostButton'
import {SignInStatus,Update} from '../middleware/context'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import useGetData from '../middleware/customHooks/useGetData'
type Props = {
    status:string;
    match:{
        params:
        {
            id:string|number
        }
    }
}
const initialVale = {
    poster:'',
    what:'',
    where:'',
    when:'',
    price:'',
    time:'',
    detail:'',
    status:'',
    assignTo:'',
    id:'',
} 
const TaskDetail:React.FunctionComponent<Props> = (props)=>{
    const {signInStatus} = React.useContext(SignInStatus)
    const [data,fetchStatus,dispatch] = useGetData(initialVale,`http://localhost:5000/tasks/${props.match.params.id}`)
    const handleSubmit = async()=>{
        const input = {assignTo:signInStatus.username,status:'ASSIGNED'}
        await axios.patch(`http://localhost:5000/tasks/${props.match.params.id}`,input)
        dispatch(startUpdate)
    }
    switch(data.status){
        case 'DONE':
            status = 'text-muted'
            break 
        case 'ASSIGNED':
            status = 'text-danger'
            break
        default:
            status = 'text-success'
    }
    return (
        <div>
            <div className='task-right-content d-flex px-2 py-3 bg-white'> 
            <div className="col-8">
                <div className='row justify-content-around'>
                    <div className={data.status==='OPEN' ? 'bg-success px-2 border rounded text-white':'bg-secondary px-2 border rounded text-white'  }>OPEN</div>
                    <div className={data.status==='ASSIGNED' ? 'bg-warning px-2 border rounded text-white':'bg-secondary px-2 border rounded text-white'  }>ASSIGNED</div>
                    <div className={data.status==='DONE' ? 'bg-danger px-2 border rounded text-white':'bg-secondary px-2 border rounded text-white'  }>DONE</div>
                </div>
                <div className="py-3 h3 font-weight-normal">{data.what}</div>
                <TaskContent content={data.poster}>Posted by</TaskContent>
                <TaskContent content={data.where}>Location</TaskContent>
                <TaskContent content={data.when}>Due</TaskContent>
                <TaskContent content={data.time}>Post Time</TaskContent>
                <TaskContent content={data.detail}>Detail</TaskContent>

            </div>
            <div className="col-4 py-2 text-center  border border-muted rounded align-self-start">
                <h6 className='py-1'>Task Budget</h6>
                <div className='h2'>${data.price}</div>
                {signInStatus.isSignIn ? <button className='btn btn-success' onClick={handleSubmit} disabled={data.status==='ASSIGNED'}>Take the Task</button> : 
                <ModalButton target="signIn">Take the Task</ModalButton>
            }
                
                <TaskContent content={data.status==='ASSIGNED'?data.assignTo:''}>Assigned To</TaskContent>
            </div>
            </div>

        </div>

    )
}
export default TaskDetail
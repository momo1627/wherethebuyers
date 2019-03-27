import * as React from 'react'
import axios from 'axios'
import {SignInStatus, ToggleModal} from '../middleware/context'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import {hideModal} from '../middleware/actions/showModalAction'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import {Update} from '../middleware/context'
import {Data} from '../pages/TaskDetailsPage'
import FormModal from './FormModel'
interface ITaskInput  {
    price:string;
    what:string;
    where:string;
    when:string;
}
const PostAtask:React.FunctionComponent = ()=>{
    const defaultInput = {
        price:'',
        what:'',
        where:'',
        when:'',
    }
    const [alert,setAlert] = React.useState({status:2,message:''})
    const {signInStatus,} = React.useContext(SignInStatus)
    const {modalStatus,modalDispatch} = React.useContext(ToggleModal)
    const {update,updateDispatch} = React.useContext(Update)
    const [input,handleChange,setInput] = useChangeInput<ITaskInput>(defaultInput)
    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const task = {
            id:new Date().getTime().toString(),
            postedBy:signInStatus.username,
            postedTime:new Date().toLocaleString(),
            ...input,
            status:'OPEN',
            assignedTo:'not assigned'
        }
        if(update) {updateDispatch(endUpdate)}
        axios.post('http://localhost:5000/tasks', task).then((res)=>{return res.data}).then(response=>{
            if(response.status === 0 ){
                setAlert({status:response.status,message:response.message})
                // modalDispatch(hideModal(props.target))
            } else{
                setAlert({status:response.status,message:response.message})
            }
          })
        //   setInput(defaultInput)
        // modalDispatch(hideModal())
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
            {alert.status === 0 && <FormModal message={alert.message} cancel={()=>{setAlert({status:0,message:''});modalDispatch(hideModal('postATask'))}}/>}
            {alert.status === 1 && <FormModal message={alert.message} cancel={()=>{setAlert({status:0,message:''});setInput(defaultInput)}}/>}
       
        </div>
        
    )
}
export default PostAtask
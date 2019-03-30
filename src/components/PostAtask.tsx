import * as React from 'react'
import axios from 'axios'
import {SignInStatus, ToggleModal} from '../middleware/context'
import FormGroup from './FormGroup'
import useChangeInput from '../middleware/customHooks/useChangeInput'
import {hideModal} from '../middleware/actions/showModalAction'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import {Update} from '../middleware/context'
import FormModal from './FormModel'
import usePostData from '../middleware/customHooks/usePostData'
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
    const [response,resetResponse,setTrigger] = usePostData()
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
        setTrigger('http://localhost:5000/tasks',{method:'post',body: JSON.stringify(task), headers: { 'Content-Type': 'application/json' }})
        updateDispatch(startUpdate)
    }
    return(
        <div className='post-content mx-auto bg-white p-3'>
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
            {response.status === 0 && <FormModal message={response.message} cancel={() => {
                resetResponse();
                modalDispatch(hideModal('postATask'))
            }} />}
            {response.status === 1 && <FormModal message={response.message} cancel={() => { resetResponse(); setInput(defaultInput) }} />}
            {response.status === 2 && <FormModal message={response.message} cancel={() => { resetResponse(); setInput(defaultInput); modalDispatch(hideModal('postATask')) }} />}
       
        </div>
        
    )
}
export default PostAtask
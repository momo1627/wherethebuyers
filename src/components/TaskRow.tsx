import * as React from 'react';
import { startUpdate, endUpdate } from '../middleware/actions/updateAction'
import { SignInStatus, Update } from '../middleware/context'
import { hideModal, showModal } from '../middleware/actions/showModalAction'
import { ToggleModal } from '../middleware/context'
import ConfirmModal from './ConfirmModal'
interface IRow {
    id: string,
    td2: string,
    td3: string,
    td4: string,
    td5: string,
    role: string,
    status: string,
    filter: string;
}
const TaskRow = (props: IRow) => {
    const { signInStatus } = React.useContext(SignInStatus)
    const { update,updateDispatch} = React.useContext(Update)
    const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
    const [confirm,setConfirm] = React.useState(false)
    let input;
    if(props.role === 'assignedTo'){
        input = {method:'put', body:JSON.stringify({status: 'PENDING'}),headers: { 'Content-Type': 'application/json' }}
    } else{
        input = {method:'put', body:JSON.stringify({status: 'COMPLETED', completedTime: new Date().toLocaleString()}),headers: { 'Content-Type': 'application/json' }}
    }

    const click =  () => {
        updateDispatch(startUpdate)
        setConfirm(false)
        modalDispatch(hideModal())
    }
    const cancel =  ()=>{
        setConfirm(false)
        modalDispatch(hideModal())
    }
    return (
        <>
        <tr className=''>
            <td className="">{props.id}</td>
            <td className="">{props.td2}</td>
            <td className="">{props.td3}</td>
            <td className="">{props.td4}</td>
            <td className="">{props.td5 ? props.td5 :
                <button className='btn btn-danger btn-sm text-center mx-auto' disabled={!(props.role === 'assignedTo' && props.filter === 'ASSIGNED' || props.role === 'postedBy' && props.filter === 'PENDING')} onClick={()=>{setConfirm(true);modalDispatch(showModal())}}>COMPLETE</button>
            }</td>
        </tr>
        {confirm && <ConfirmModal url={`localhost:5000/${props.id}`} input={input} title='Complete the task' click={click} cancel={cancel}/>}
        </>
    )
}
export default TaskRow
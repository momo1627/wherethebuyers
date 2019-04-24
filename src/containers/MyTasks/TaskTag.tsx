import * as React from 'react';
import ConfirmModal from '../../components/Modal/ConfirmModal'
import { SignInStatus } from '../../context/context'
import API_Url from '../../constants/api'
import { Link } from 'react-router-dom'
interface IProp {
    status: string;
    _id: string;
    role: string;
    hide: () => void
}
const TaskTag = (props: IProp) => {
    let action;
    let method;
    let status;
    switch (props.status) {
        case 'OPEN':
            action = 'CANCEL';
            method = 'delete';
            status = 'success'
            break
        case 'ASSIGNED':
            action = 'DONE';
            method = 'put';
            status = 'warning';
            break
        case 'DONE':
            action = 'COMPLETED';
            method = 'put'
            status = 'danger'
            break
        case 'COMPLETED':
            action = 'REVIEW'
            status = 'dark'
            break
    }
    const { signInStatus, } = React.useContext(SignInStatus)
    const input = { method: method, body: JSON.stringify({ status: action, userId: signInStatus.userId }), headers: { 'Content-Type': 'application/json' } }
    const [confirm, setConfirm] = React.useState(false);
    const click = () => {
        setConfirm(false);
    }
    const cancel = () => {
        setConfirm(false);
    }

    return (
        <>
            <button className='btn position-absolute' type='button' onClick={() => { props.hide() }}><span className='h4'>&times;</span></button>
            <div className='mytask-tag d-flex flex-column justify-content-around align-items-center p-2'>
                <h5 >Task is <span className={`text-${status}`}>{props.status}</span></h5>
                {props.status === 'OPEN' && <a className={`text-white bg-${status} btn btn-sm`} onClick={() => { setConfirm(true); }}>{action} the task</a>}
                {props.status === 'ASSIGNED' && (props.role === 'tasker' ? <span className={`text-white bg-${status} btn btn-sm`} onClick={() => { setConfirm(true); }}>{action} the task</span> :
                    <span>Wait tasker to deliver</span>)}
                {props.status === 'DONE' && (props.role === 'poster' ? <span className={`text-white bg-${status} btn btn-sm`} onClick={() => { setConfirm(true); }}>{action} the task</span> :
                    <span>Wait poster to confirm</span>)}
                {props.status === 'COMPLETED' && <span >To review the Task</span>}
                <Link className="text-center text-info rounded my-2" to={`/task/${props._id}`} >Go to Task Detail</Link>
                {confirm && <ConfirmModal url={`${API_Url}/task/${props._id}`} input={input} title={`${action} the task`} click={click} cancel={cancel} />}
            </div>
        </>

    )
}
export default TaskTag
import * as React from 'react';
import ConfirmModal from '../../components/Modal/ConfirmModal'
import { SignInStatus } from '../../context/context'

interface IProp {
    status: string;
    _id: string;
    role: string;
}

const TaskTag = (props: IProp) => {
    let action;
    let method;
    let status;
    switch (props.status) {
        case 'OPEN':
            action = 'CANCEL';
            method = 'delete';
            status = 'bg-success'
            break
        case 'ASSIGNED':
            action = 'DONE';
            method = 'put';
            status = 'bg-warning';
            break
        case 'DONE':
            action = 'COMPLETED';
            method = 'put'
            status = 'bg-danger'
            break
        case 'COMPLETED':
            status = 'bg-dark'
            break
    }
    const { signInStatus, } = React.useContext(SignInStatus)
    const input = { method: method, body: JSON.stringify({ status: action, userId: signInStatus.userId }), headers: { 'Content-Type': 'application/json' } }
    const [confirm, setConfirm] = React.useState(false)
    const click = () => {
        setConfirm(false)
    }
    const cancel = () => {
        setConfirm(false)
    }

    return (
        <div className='d-flex justify-content-between px-2'>
            <div className={`${status} btn btn-sm text-white font-weight-bold`}>{props.status}</div>
            <div className=''>
                {props.status === 'OPEN' && <button className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</button>}
                {props.status === 'ASSIGNED' && props.role === 'tasker' && <button className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</button>}
                {props.status === 'DONE' && props.role === 'poster' && <button className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</button>}
            </div>
            {confirm &&
                <ConfirmModal url={`http://localhost:5000/tasks/${props._id}`} input={input} title={`${action} the task`} click={click} cancel={cancel} />}
        </div>
    )
}
export default TaskTag
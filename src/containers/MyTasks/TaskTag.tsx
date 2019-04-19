import * as React from 'react';
import ConfirmModal from '../../components/Modal/ConfirmModal'
import { SignInStatus } from '../../context/context'
import API_Url from '../../constants/api'
import { Link } from 'react-router-dom'
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
            action = 'REVIEW'
            status = 'bg-dark'
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
    const [review, setReview] = React.useState(false);
    const createReview = async () => {
        const result = await fetch(`${API_Url}/review`, { body: JSON.stringify({ taskId: props._id }), method: 'post', headers: { 'Content-Type': 'application/json' } })
        await result.json();
        if (result.ok) {
            setReview(true);
        }
    }

    return (
        <div className='d-flex justify-content-between px-2'>
            <div className=''>
                {props.status === 'OPEN' && <span className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</span>}
                {props.status === 'ASSIGNED' && props.role === 'tasker' && <span className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</span>}
                {props.status === 'DONE' && props.role === 'poster' && <span className={`${status} btn btn-sm text-white font-weight-bold`} onClick={() => { setConfirm(true); }}>{action}</span>}
                {props.status === 'COMPLETED' && <span className={`${status} btn btn-sm text-white font-weight-bold`} onClick={createReview}>{action}</span>}
            </div>
            {review &&
                <div className='modal-container small'>
                    <div className='confirm-container d-flex flex-column justify-content-around bg-white text-center py-2'>
                        <h4>Go to TaskDetail to Review</h4>
                        <div className='d-flex justify-content-around'>
                            <Link className="btn btn-primary btn-sm text-center text-white text-decoration-none" to={`/task/${props._id}`} >Go</Link>
                            <button className='btn btn-danger btn-sm text-center text-white' onClick={() => { setReview(false) }} >Cancel</button>
                        </div>
                    </div>
                </div>}
            {confirm &&
                <ConfirmModal url={`${API_Url}/task/${props._id}`} input={input} title={`${action} the task`} click={click} cancel={cancel} />}
        </div>
    )
}
export default TaskTag
import * as React from 'react'
import moment from 'moment'
import TaskTag from './TaskTag'
type Props = {
    what: string;
    _id: string;
    where: string;
    when: string;
    price: string;
    status: string;
    postedTime:string;
    role:string;
}
const TaskLabel: React.FunctionComponent<Props> = (props) => {
    let action;
    let method;
    let status;
    const [showTask,setShowTask] = React.useState(false)
    const handleTask = ()=>{
        setShowTask((prev)=>{return !prev})
    }
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
    return (
        <div className={`mytask-label bg-white mt-1 px-1 border-${status}`} key={props._id} >
            <div className="d-flex justify-content-between">
                <span className='mytask-list-item' onClick={handleTask}>Buy {props.what}</span>
                <span className=''>${props.price}</span>
            </div>
            <div className={`small text-muted text-left border-top border-muted `}>Posted: {moment(props.postedTime).format('MMMM Do YYYY, h:mm:ss a')}</div>
            <div className={`small text-muted text-left border-top border-muted `}>Due: {moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</div>
            {showTask && <div className='mytask-container'><div className='mytask-content'><TaskTag hide={()=>{setShowTask(false)}} {...props}/></div></div>}
        </div>
    )
}
export default TaskLabel
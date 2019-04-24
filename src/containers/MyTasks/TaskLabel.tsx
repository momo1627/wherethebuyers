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
    let status;
    const [showTask,setShowTask] = React.useState(false)
    const handleTask = ()=>{
        setShowTask((prev)=>{return !prev})
    }
    switch (props.status) {
        case 'OPEN':
            status = 'success'
            break
        case 'ASSIGNED':
            status = 'warning';
            break
        case 'DONE':
            status = 'danger'
            break
        case 'COMPLETED':
            status = 'info'
            break
    }
    
    return (
        <div className={`mytask-label bg-white mt-1 px-1 border-${status}`} key={props._id} >
            <div className="d-flex justify-content-between">
                <span className='mytask-list-item' onClick={handleTask}>Buy {props.what}</span>
                <span className=''>${props.price}</span>
            </div>
            <div className={`text-muted text-left border-top border-muted `}>Posted: {moment(props.postedTime).format('MMMM Do YYYY, h:mm:ss a')}</div>
            <div className={`text-muted text-left border-top border-muted `}>Due: {moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</div>
            {showTask && <div className='mytask-container'><div className='mytask-content'><TaskTag hide={()=>{setShowTask(false)}} {...props}/></div></div>}
        </div>
    )
}
export default TaskLabel
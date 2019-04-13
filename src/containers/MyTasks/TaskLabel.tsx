import * as React from 'react'
import {Link} from 'react-router-dom'

type Props = {
    what: string;
    _id: string;
    where: string;
    when: string;
    price: string;
    status: string;
}
const TaskLabel: React.FunctionComponent<Props> = (props) => {
    return (
        <div className='bg-light px-2' key={props._id}>
            <span className='small text-left'>Task_Id: <Link to={`/tasks/${props._id}`} className='ml-2'>{props._id}</Link></span>
            <div className="d-flex justify-content-start align-items-center">
                <div className="ml-2 font-weight-bold" style={{"fontSize":"18px"}}>Buy {props.what}</div>
            </div>
            <div className="small text-dark d-flex justify-content-between align-items-center">
                <div className={`text-right small font-weight-bold`}>Locaton: {props.where}</div>
                <div className={` font-weight-bold small`}>Due at: {props.when}</div>
            </div>

        </div>
    )
}
export default TaskLabel
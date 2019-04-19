import * as React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

type Props = {
    what: string;
    _id: string;
    where: string;
    when: string;
    price: string;
    status: string;
}

const TaskLabel: React.FunctionComponent<Props> = (props) => {
    let action;
    let method;
    let status;
    switch (props.status) {
        case 'OPEN':
            action = 'CANCEL';
            method = 'delete';
            status = 'text-success'
            break
        case 'ASSIGNED':
            action = 'DONE';
            method = 'put';
            status = 'text-warning';
            break
        case 'DONE':
            action = 'COMPLETED';
            method = 'put'
            status = 'text-danger'
            break
        case 'COMPLETED':
            action = 'REVIEW'
            status = 'text-dark'
            break
    }
    return (
        <div className='bg-light px-1' key={props._id}>
            <div className="d-flex justify-content-start align-items-center">
                <div className="font-weight-bold" style={{ "fontSize": "18px" }}>Buy {props.what}</div>
            </div>
            <div className="small text-dark  d-flex justify-content-between align-items-center">
                <span className={`${status} small font-weight-bold`}>{props.status}</span>
                <span className={`text-left font-weight-bold small`}>Due at: {moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>

        </div>
    )
}
export default TaskLabel
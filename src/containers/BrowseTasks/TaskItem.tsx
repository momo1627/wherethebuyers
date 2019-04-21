import * as React from 'react'
import moment from 'moment'

type IData = {
  poster: string,
  posterId: string,
  postedTime: string,
  what: string,
  where: string,
  when: string,
  price: string,
  status: string,
  tasker: string,
  taskerId: string,
  assignedTime: string,
  _id: string,
  completedTime: string,
  reviews: string
}
const TaskDetail: React.FunctionComponent<IData> = (props) => {


  let status
  switch (props.status) {
    case 'COMPLETED':
      status = 'dark'
      break
    case 'ASSIGNED':
      status = 'warning'
      break
    case 'DONE':
      status = 'danger'
      break
    default:
      status = 'success'
  }

  return (
    <div className='task-list-item task-list-item-active bg-white m-1 px-1' >
        <div className='d-flex align-items-center mb-1'>
          <div className=" text-left font-weight-bold small ">{props.what}</div>
        </div>
        <div className='d-flex flex-column justify-content-around '>
          <div className='ml-1  small'>
            <div className='small'>&#9962; Location </div>
            <div className='small font-weight-bold'>{props.where}</div></div>
          <div className='ml-1  small'>
            <div className='small '>&#128359; Due Time </div>
            <div className='small font-weight-bold'>{moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</div></div>
        </div>
        <div className='small d-flex justify-content-between border-top border-muted '>
          <span className={`font-weight-bold text-${status} `}>{props.status}</span>
        </div>
    </div>

  )
}
export default TaskDetail
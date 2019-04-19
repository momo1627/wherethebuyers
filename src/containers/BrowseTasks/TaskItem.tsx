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
        <div className='d-flex align-items-center border-bottom border-muted  mb-1'>
          <div className=" text-center font-weight-bold ">Buy {props.what}</div>
        </div>
        <div className='d-flex flex-column justify-content-around '>
          <div className='border-bottom border-muted'>
            <div className='small '>Location &#9962;</div>
            <div className=''>{props.where}</div></div>
          <div className='border-bottom border-muted'>
            <div className='small '>Due Time &#128359;</div>
            <div className='small'>{moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</div></div>
        </div>
        <div className='small d-flex justify-content-between '>
          <span className={`font-weight-bold text-${status} `}>{props.status}</span>
        </div>
      </div>

  )
}
export default TaskDetail
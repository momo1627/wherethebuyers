import * as React from 'react'
import moment from 'moment'
import TaskContent from './TaskContent'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus, Update } from '../../context/context'
import ConfirmModal from '../../components/Modal/ConfirmModal'

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
  const { signInStatus } = React.useContext(SignInStatus)
  const [isShowDetails, setIsShowDetails] = React.useState(false)
  const handleShowDetails = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsShowDetails((prev) => !prev)
  }
  const [confirm, setConfirm] = React.useState(false)
  const input = { method: 'put', body: JSON.stringify({ tasker: signInStatus.username, taskerId: signInStatus.userId, status: 'ASSIGNED' }), headers: { 'Content-Type': 'application/json' },credentials: 'include' }
  const click = () => {
    setConfirm(false)
  }
  const cancel = () => {
    setConfirm(false)
  }
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
    <>
      <div className='task-list-item bg-white m-1 p-1 row' key={props._id}>
        <div className='col-12 d-flex align-items-center border-bottom border-muted px-0 py-1 mb-1'>
          <div className={`d-none d-lg-block btn btn-sm btn-${status} text-white `}>{props.status}</div>
          <div className=" text-center font-weight-bold ml-2">Buy {props.what}</div>
        </div>
        <div className='col-6 col-lg-4 pl-2 d-flex flex-column justify-content-around '>
          <div className='border-bottom border-muted'>
            <div className='font-weight-bold'>Location &#9962;</div>
            <div className=' small'>{props.where}</div></div>
          <div className='border-bottom border-muted'>
            <div className='font-weight-bold'>Due Time &#128359;</div>
            <div className='small'>{moment(props.when).format('MMMM Do YYYY, h:mm:ss a')}</div></div>
        </div>
        <div className="col-6 col-lg-3 py-1 bg-white text-center d-flex flex-column justify-content-center">
          <div>
            <h6 className='py-1'>Task Budget</h6>
            <div className='h2'>${props.price}</div>
          </div>
          <div className="">
            {signInStatus.isSignIn ?
              <button className='btn btn-success btn-sm' disabled={props.status !== "OPEN" || props.poster === signInStatus.username} onClick={() => { setConfirm(true) }}>Take the Task</button>
              : <ModalButton target="signIn">Take the Task</ModalButton>
            }
          </div>
        </div>
        <div className='d-lg-none d-block small w-100 d-flex justify-content-between '>
          <div className={`btn btn-sm  btn-${status} text-white `}>{props.status}</div>
          <button className='btn btn-sm btn-info ' type='button' onClick={handleShowDetails}>Details</button>
        </div>
        <div className={`${!isShowDetails && 'd-none'} d-lg-block col-12 col-lg-5 small row`}>
          <div className='col-12 col-sm-6 col-lg-12 p-0 small'>
            <TaskContent content={props.poster}>Posted By </TaskContent>
            <TaskContent content={moment(props.postedTime).format('MMMM Do YYYY, h:mm:ss a')}>Posted Time </TaskContent>
          </div>
          <div className='col-12 col-sm-6 col-lg-12 p-0 small'>
            <TaskContent content={props.tasker}>Assigned To </TaskContent>
            <TaskContent content={props.assignedTime && moment(props.assignedTime).format('MMMM Do YYYY, h:mm:ss a')}>Assigned Time </TaskContent>
          </div>

        </div>
      </div>
      {confirm && <ConfirmModal url={`http://localhost:5000/task/${props._id}`} input={input} title='take the task' click={click} cancel={cancel} />}
    </>

  )
}
export default TaskDetail
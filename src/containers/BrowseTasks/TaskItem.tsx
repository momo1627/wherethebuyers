import * as React from 'react'
import { ToggleModal } from '../../context/context'
import { hideModal, showModal } from '../../actions/showModalAction'
import TaskContent from './TaskContent'
import ModalButton from '../../components/Modal/ModalButton'
import { SignInStatus, Update } from '../../context/context'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import useFetchData from '../../hooks/useFetchData'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import API_Url from '../../constants/api'
// type Props = {
//     status: string;
//     match: {
//         params:
//         {
//             id: string | number
//         }
//     }
// }
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
  const { modalStatus, modalDispatch } = React.useContext(ToggleModal)
  const { signInStatus } = React.useContext(SignInStatus)
  const [confirm, setConfirm] = React.useState(false)
  const input = { method: 'put', body: JSON.stringify({tasker:signInStatus.username, taskerId:signInStatus.userId, status: 'ASSIGNED'}), headers: { 'Content-Type': 'application/json' } }
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
    case 'PENDING':
      status = 'danger'
      break
    default:
      status = 'success'
  }

  return (
    <>
      <div className='task-list-item bg-white m-1 p-1 row' key={props._id}>
        <div className='col-12 d-flex align-items-center border-bottom border-muted px-0 py-1 mb-1'>
          <div className={`btn btn-sm btn-${status} text-white `}>{props.status}</div>
          <div className=" text-center font-weight-bold ml-2">Buy {props.what}</div>
        </div>
        <div className='col-6 col-lg-4 pl-2 d-flex flex-column justify-content-around '>
          <div className='border-bottom border-muted'>
            <div className='font-weight-bold'>Location</div>
            <div>{props.where}</div></div>
          <div className='border-bottom border-muted'>
            <div className='font-weight-bold'>Due Time</div>
            <div>{props.when}</div></div>
        </div>
        <div className="col-6 col-lg-3 py-1 bg-white text-center d-flex flex-column justify-content-center">
          <div>
            <h6 className='py-1'>Task Budget</h6>
            <div className='h2'>${props.price}</div>
          </div>
          <div className="">
            {signInStatus.isSignIn ?
              <button className='btn btn-success' disabled={props.status !== "OPEN" || props.poster === signInStatus.username} onClick={() => { setConfirm(true)}}>Take the Task</button>
              : <ModalButton target="signIn">Take the Task</ModalButton>
            }
          </div>
        </div>
        <div className=' d-lg-block col-12 col-lg-5 small row'>
          <div className='col-12 col-sm-6 col-lg-12 p-0 '>
            <TaskContent content={props.poster}>Posted By</TaskContent>
            <TaskContent content={props.postedTime}>Posted Time</TaskContent>
          </div>
          <div className='col-12 col-sm-6 col-lg-12 p-0 '>
            <TaskContent content={props.tasker}>Assigned To</TaskContent>
            <TaskContent content={props.assignedTime}>Assigned Time</TaskContent>
          </div>

        </div>
      </div>
      {confirm && <ConfirmModal url={`http://localhost:5000/tasks/${props._id}`} input={input} title='take the task' click={click} cancel={cancel} />}
    </>

  )
}
export default TaskDetail
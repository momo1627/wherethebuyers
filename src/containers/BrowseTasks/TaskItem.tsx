import * as React from 'react'
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { SignInStatus } from '../../context/context'
import ModalButton from '../../components/Modal/ModalButton'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import { ITaskDetail } from './types/stateAndProps'
import TaskContent from './TaskContent'
import API_Url from '../../constants/api'
const TaskItem = (props: ITaskDetail) => {
  const { _id, what, where, status, when, price, posterId, poster, tasker, taskerId, postedTime, assignedTime } = props
  const { signInStatus } = React.useContext(SignInStatus);
  const [confirm, setConfirm] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const input = { method: 'put', body: JSON.stringify({ tasker: signInStatus.username, taskerId: signInStatus.userId, status: 'ASSIGNED' }), headers: { 'Content-Type': 'application/json' }, credentials: 'include' }
  const click = () => {
    setConfirm(false)
  }
  const cancel = () => {
    setConfirm(false)
  }
  const time = moment(when).format('MMMM Do YYYY, h:mm:ss a');
  let color;
  switch (status) {
    case 'COMPLETED':
      color = 'dark'
      break
    case 'ASSIGNED':
      color = 'warning'
      break
    case 'DONE':
      color = 'danger'
      break
    default:
      color = 'success'
  }
  return (
    <div className='task-list-item'>
      <TaskContent title={what} />
      <div className='d-sm-flex justify-content-start'>
        <div>
          <TaskContent small='small' title="Location" >{where}</TaskContent>
          <TaskContent small='small' title="Due Time" >{time}</TaskContent>
        </div>
        <div className="mx-auto text-center d-flex flex-sm-column justify-content-around">
          <div className='h5'>${price}</div>
          {signInStatus.isSignIn ?
            <button className='btn btn-success btn-sm ' disabled={status !== "OPEN" || poster === signInStatus.username} onClick={() => { setConfirm(true) }}>Take the Task</button>
            : <ModalButton target="signIn"><button className='btn btn-primary btn-sm ' >Take the Task</button></ModalButton>}
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <TaskContent color={color} small='small' title={status} />
        <small className='task-detail-button' onClick={() => { setShowDetail((pre) => !pre) }} >Show detail</small>
      </div>
      <div className={!showDetail ? 'd-none' : ''}>
        <div className='mx-auto border-bottom border-muted'>
          <TaskContent
            small="small"
            title="Posted By">
            <Link to={`/profile/${posterId}`} className='text-info'>{poster}</Link>
          </TaskContent>
          <TaskContent
            small="small"
            title="Posted Time">
            {moment(postedTime).format('MMMM Do YYYY, h:mm:ss a')}
          </TaskContent>
        </div>
        <div className='mx-auto border-bottom border-muted'>
          <TaskContent
            small="small"
            title="Assigned To">
            <Link
              to={`/profile/${taskerId}`}
              className='text-info'>{tasker}
            </Link>
          </TaskContent>
          <TaskContent
            small="small"
            title="Assigned Time">
            {assignedTime && moment(assignedTime).format('MMMM Do YYYY, h:mm:ss a')}
          </TaskContent>
        </div>
      </div>
      {confirm && <ConfirmModal url={`${API_Url}/task/${_id}`} input={input} title='take the task' click={click} cancel={cancel} />}
    </div>

  )
}
export default React.memo(TaskItem)
import * as React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { startUpdate, endUpdate } from '../../actions/updateAction';
import { SignInStatus, Update } from '../../context/context'
import TaskContent from '../BrowseTasks/TaskContent'
import ModalButton from '../../components/Modal/ModalButton'
import ConfirmModal from '../../components/Modal/ConfirmModal'
import Loading from '../../components/Loading'
import API_Url from '../../constants/api'
import TaskReviewContainer from './TaskReviewContainer';

interface IData {
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
  reviews: object,
}
interface IProp {
  match: {
    params: {
      id: string
    }
  }
}


const TaskDetail = (props: IProp) => {
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const { signInStatus } = React.useContext(SignInStatus)
  const input = { method: 'put', body: JSON.stringify({ tasker: signInStatus.username, taskerId: signInStatus.userId, status: 'ASSIGNED' }), headers: { 'Content-Type': 'application/json' }, credentials: 'include' }
  const click = () => {
    setConfirm(false)
  }
  const cancel = () => {
    setConfirm(false)
  }
  const [confirm, setConfirm] = React.useState(false)
  const { update, updateDispatch } = React.useContext(Update)
  const [data, setData] = React.useState()
  const [response, setResponse] = React.useState();
  const fetchTasks = async () => {
    setIsDataLoading(true);
    setIsDataLoaded(false);
    const response = await fetch(`${API_Url}/task/${props.match.params.id}`, { method: 'get' });
    const result = await response.json();
    setData(result.data);
    setResponse(response.ok);
    setIsDataLoaded(true);
    setIsDataLoading(false);
  }
  React.useEffect(() => {
    if (update) { updateDispatch(endUpdate) }
    fetchTasks();
  }, [update])
  let status
  switch (data && data.status) {
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
    <div className='task-detail bg-white'>
      {isDataLoading && !isDataLoaded && <Loading />}
      {isDataLoaded && !isDataLoading && response &&
        <div className='p-2'>
          <div className={`alert bg-${status} p-0 text-white text-center`}>{data.status}</div>
          <div className="h4 text-center  font-weight-normal">{data.what}</div>
          <div className='d-md-flex border-bottom border-muted py-1 '>
            <div className="mx-auto text-center d-flex flex-column justify-content-center">
              <div>
                <h6 className='py-1'>Task Budget</h6>
                <div className='h2'>${data.price}</div>
              </div>
              {data.status === "OPEN" && <div>
                {signInStatus.isSignIn ?
                  <button className='btn btn-success btn-sm ' disabled={data.poster === signInStatus.username} onClick={() => { setConfirm(true) }}>Take the Task</button>
                  : <ModalButton target="signIn"><button className='btn btn-primary btn-sm ' >Take the Task</button></ModalButton>}
              </div>}
            </div>
          </div>
          <div className='border-bottom border-muted mx-auto'>
            <TaskContent content={''}>Location &#9962; </TaskContent>
            <TaskContent content={data.where}></TaskContent>
            <TaskContent content={''}> Due &#128359;</TaskContent>
            <TaskContent content={moment(data.when).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
          </div>
          <div className='mx-auto border-bottom border-muted'>
            <TaskContent content={''}>Posted By</TaskContent>
            <Link to={`/profile/${data.posterId}`} className='text-info'>{data.poster}</Link>
            <TaskContent content={''}>Posted Time &#128359; </TaskContent>
            <TaskContent content={moment(data.postedTime).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
          </div>
          <div className='mx-auto border-bottom border-muted'>
            <TaskContent content={''}>Assigned To</TaskContent>
            <Link to={`/profile/${data.taskerId}`} className='text-info'>{data.tasker}</Link>
            <TaskContent content={''}>Assigned Time &#128359; </TaskContent>
            <TaskContent content={data.assignedTime && moment(data.assignedTime).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
          </div>
          {data.completedTime && <div className='mx-auto border-bottom border-muted'>
            <TaskContent content={''}>Completed Time &#128359; </TaskContent>
            <TaskContent content={data.completedTime && moment(data.completedTime).format('MMMM Do YYYY, h:mm:ss a')}></TaskContent>
          </div>}
          {data.status === "COMPLETED" && <TaskReviewContainer {...data.reviews} taskerId={data.taskerId} tasker={data.tasker} posterId={data.posterId} poster={data.poster} taskId={data._id} />}
        </div>
      }
      {confirm && <ConfirmModal url={`${API_Url}/task/${props.match.params.id}`} input={input} title='take the task' click={click} cancel={cancel} />}
    </div>

  )
}
export default TaskDetail
import * as React from 'react'
import axios from 'axios'
import TaskContent from '../components/TaskContent'
import ModalButton from '../components/ModalButton'
import { SignInStatus, Update } from '../middleware/context'
import { startUpdate, endUpdate } from '../middleware/actions/updateAction'
import useGetData from '../middleware/customHooks/useGetData'
type Props = {
    status: string;
    match: {
        params:
        {
            id: string | number
        }
    }
}
export type Data = typeof initialVale
const initialVale = {
    postedBy: '',
    postedTime: '',
    what: '',
    where: '',
    when: '',
    price: '',
    detail: '',
    status: '',
    assignedTo: '',
    assignedTime: '',
    id: '',
    completedTime: ''
}
const TaskDetail: React.FunctionComponent<Props> = (props) => {
    const { signInStatus } = React.useContext(SignInStatus)
    const [response, fetchStatus, dispatch] = useGetData<Data>(`http://localhost:5000/tasks/${props.match.params.id}`)
    const handleSubmit = async () => {
        if (signInStatus.username === '') { return }
        const input = { assignedTo: signInStatus.username, status: 'ASSIGNED', assignedTime: new Date().toLocaleString() }
        await axios.patch(`http://localhost:5000/tasks/${props.match.params.id}`, input)
        dispatch(startUpdate)
    }
    const profile = response.data[0]
    return (
        <>
            {
                !fetchStatus ? <div>data is Loading</div> :
                    (profile ?
                        <div className='task-right-content px-2 pt-4'>
                            <div className='w-75 mx-auto row justify-content-around '>
                                <div className={profile.status === 'OPEN' ? 'bg-success px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>OPEN</div>
                                <div className={profile.status === 'ASSIGNED' ? 'bg-warning px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>ASSIGNED</div>
                                <div className={profile.status === 'PENDING' ? 'bg-danger px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>PENDING</div>
                                <div className={profile.status === 'COMPLETED' ? 'bg-dark px-2 border shadow-sm rounded text-white' : 'bg-muted px-2 border shadow-sm rounded text-dark bg-white'}>COMPLETED</div>
                            </div>

                        
                            <div className="w-75 my-4 py-2 d-flex justify-content-around mx-auto text-center  border border-muted shadow-sm rounded bg-white">
                                <div>
                                    <h6 className='py-1'>Task Budget</h6>
                                    <div className='h2'>${profile.price}</div>
                                </div>
                                <div className="align-self-center">
                                    {signInStatus.isSignIn ? <button className='btn btn-success' onClick={handleSubmit} disabled={profile.status !== "OPEN" || profile.postedBy === signInStatus.username}>Take the Task</button> :
                                        <ModalButton target="signIn">Take the Task</ModalButton>
                                    }
                                </div>
                                <div className="align-self-center">
                                    <h6>Assigned To</h6>
                                    <div className='h6'>{profile.status !== 'OPEN' ? profile.assignedTo : ''}</div>
                                </div>
                            </div>
                            <div className='w-75 mx-auto bg-white shadow rounded p-5'>
                                <div className="mb-4 h3 font-weight-normal">{profile.what}</div>
                                <TaskContent content={profile.postedBy}>Posted By</TaskContent>
                                <TaskContent content={profile.postedTime}>Posted Time</TaskContent>
                                <TaskContent content={profile.where}>Location</TaskContent>
                                <TaskContent content={profile.when}>Due</TaskContent>
                                </div>

                        </div> : <div>{response.message}</div>
                        )
            }
        </>

    )
}
export default TaskDetail
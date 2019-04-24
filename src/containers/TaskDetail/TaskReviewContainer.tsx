import * as React from 'react'
import { SignInStatus, Update } from '../../context/context'
import TaskReviewMaker from './TaskReviewMaker'
import TaskReview from './TaskReview'
import API_Url from '../../constants/api'
import './style.css'
interface Props {
    taskId: string;
    reviewToTasker: {
        message: string,
        rating: number,
    },
    reviewToPoster: {
        message: string,
        rating: number,
    }
    _id: string;
    poster: string;
    taskerId:string;
    posterId:string;
    tasker: string;
}
const TaskReviewContainer: React.FunctionComponent<Props> = (props) => {
    const [reviewMaker, setReviewMaker] = React.useState(false);
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus);
    const [reviewId, setReviewId] = React.useState('')
    const createReview = async () => {
        const result = await fetch(`${API_Url}/review`, { body: JSON.stringify({ taskId: props.taskId }), method: 'post', headers: { 'Content-Type': 'application/json' } })
        const response = await result.json();
        if (result.ok) {
            setReviewId(response.data)
            setReviewMaker(true);
        }
    }
    const handleReviewMaker = () => {
        setReviewMaker((prev) => { return !prev })
    }
    const role = signInStatus.username === props.poster ? 'poster' : 'tasker'
    return (
        <div>
            <div className='d-flex justify-content-between py-2'>
                <div className='font-weight-bold'>Reviews</div>
                {<button className='btn btn-sm btn-info p-0' onClick={createReview}>Add Review</button>}
            </div>
            {props.reviewToTasker &&
                <div className='d-flex justify-content-start border-bottom align-items-center border-muted'>
                    <TaskReview userId={props.posterId} rating={props.reviewToTasker.rating} message={props.reviewToTasker.message} username={props.poster} />
                </div>}
            {props.reviewToPoster &&
                <div className='d-flex justify-content-start border-bottom align-items-center border-muted'>
                    <TaskReview userId={props.taskerId} rating={props.reviewToPoster.rating} message={props.reviewToPoster.message} username={props.tasker} />
                </div>}
            {reviewMaker && <TaskReviewMaker username={signInStatus.username} userId={signInStatus.userId} reviewId={reviewId} role={role} cancel={handleReviewMaker} />}
        </div>
    )
}
export default TaskReviewContainer
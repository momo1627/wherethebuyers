import * as React from 'react'
import { SignInStatus, Update } from '../../context/context'
import API_Url from '../../constants/api'
import TaskReviewMaker from './TaskReviewMaker'
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
    tasker: string;
}
const TaskReview: React.FunctionComponent<Props> = (props) => {
    const [reviewMaker, setReviewMaker] = React.useState(false);
    const { signInStatus, signInDispatch } = React.useContext(SignInStatus);
    const [reviewId, setReviewId] = React.useState('')
    const rating = (num: any) => {
        let number = parseInt(num)
        return (
            <div className='d-flex flex-row-reverse justify-content-end'>
                {[...Array(number).keys()].map((n) => { return (<span key={n} className='text-info'>★</span>) })}
            </div>
        )
    }
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
            <div className='d-flex justify-content-start border-bottom align-items-center border-muted'>
                <div className='small'>{props.poster}</div>
                {props.reviewToTasker &&
                    <div className='ml-2'>
                        {props.reviewToTasker.rating && rating(props.reviewToTasker.rating)}
                        <div className='small '>{props.reviewToTasker.message && props.reviewToTasker.message}</div>
                    </div>}
            </div>
            <div className='d-flex justify-content-start border-bottom align-items-center border-muted'>
                <div className='small'>{props.tasker}</div>
                {props.reviewToPoster &&
                    <div className='ml-2'>
                        {props.reviewToPoster.rating && rating(props.reviewToPoster.rating)}
                        <div className='small '>{props.reviewToPoster.message && props.reviewToPoster.message}</div>
                    </div>}
            </div>
            {reviewMaker && <TaskReviewMaker reviewId={reviewId} role={role} cancel={handleReviewMaker} />}
        </div>
    )
}
export default TaskReview
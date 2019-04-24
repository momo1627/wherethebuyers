import * as React from 'react';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import Rating from './Ratings'
import TaskCount from './TaskCount'
import TaskReview from '../TaskDetail/TaskReview'
import API_Url from '../../constants/api'
import './style.css'
interface IProp {
  match: {
    params: {
      id: string
    }
  }
}
const initialProfile = {
  username: '',
  assignedTasks: {
    totalCount: 0,
    completedCount: 0,
    completedRatio: 0,
  },
  postedTasks: {
    totalCount: 0,
    completedCount: 0,
    completedRatio: 0,
  },
  reviews: {
    postedReviews: [
      {
        taskId: '',
        taskContent:'',
        reviewToPoster: {
          username: '',
          userId: '',
          rating: 0,
          message: ''
        }
      }],
    assignedReviews: [{
      taskId: '',
      taskContent:'',
      reviewToTasker: {
        username: '',
        userId: '',
        rating: 0,
        message: ''
      }
    }],
    postedReviewsCount: 0,
    posterRating: 0,
    assignedReviewsCount: 0,
    taskerRating: 0,
  }
}
const Profile = (props: IProp) => {
  const [profile, setProfile] = React.useState(initialProfile)
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [role, setRole] = React.useState('poster')
  const fetchProfile = async () => {
    setIsDataLoading(true);
    setIsDataLoaded(false);
    const result = await fetch(`${API_Url}/profile/${props.match.params.id}`, { method: 'get', headers: { 'Content-Type': 'application/json' }, })
    const response = await result.json();
    if (result.ok) {
      setProfile(response.data);
    }
    setIsDataLoaded(true);
    setIsDataLoading(false);
  }

  React.useEffect(() => { fetchProfile() }, [props.match.params.id])
  return (
    <>
      {isDataLoading && !isDataLoaded && <Loading />}
      {isDataLoaded && !isDataLoading &&
        <div className='profile-container bg-white p-2'>
          <div className='profile-user'>
            <div className='text-center'>{profile.username}</div>
          </div>
          <div className='text-info border-bottom border-info my-1'>Task Infomation</div>
          <div className='text-center mt-2'>
            <span className={role === "poster" ? `profile-nav text-white bg-info rounded p-1` : 'profile-nav text-info bg-white border-info border rounded p-1'} onClick={() => { setRole('poster') }}>As Poster</span>
            <span className={role === "tasker" ? `profile-nav text-white bg-info rounded p-1` : 'profile-nav text-info bg-white border-info border rounded p-1'} onClick={() => { setRole('tasker') }}>As Tasker</span>
          </div>
          <div className='profile-count text-center bg-white border border-info rounded rounded-lg'>
            {role === 'poster' && <>
              <TaskCount total={profile.postedTasks.totalCount} completed={profile.postedTasks.completedCount} ratio={profile.postedTasks.completedRatio * 100} />
              <Rating rating={profile.reviews.posterRating} count={profile.reviews.postedReviewsCount} />
            </>
            }
            {role === 'tasker' && <>
              <TaskCount total={profile.assignedTasks.totalCount} completed={profile.assignedTasks.completedCount} ratio={profile.assignedTasks.completedRatio * 100} />
              <Rating rating={profile.reviews.taskerRating} count={profile.reviews.assignedReviewsCount} />
            </>
            }
          </div>
          <div>
            <div className='text-info border-bottom border-info mt-1'>Reviews</div>
            {role === 'poster' &&
              <div className=''>
                {profile.reviews.postedReviews.map((re, index) => {
                  return (
                  <div className='d-flex flex-column small align-items-start col-12 col-sm-6 mx-auto mt-1 border border-info' key={re.reviewToPoster.username + index}>
                    <Link to={`/task/${re.taskId}`}>{re.taskContent}</Link>
                    <TaskReview key={re.reviewToPoster.username + index} username={re.reviewToPoster.username} userId={re.reviewToPoster.userId} rating={re.reviewToPoster.rating} message={re.reviewToPoster.message} />
                  </div>
                  )
                }
                )}
              </div>
            }
            {role === 'tasker' &&
              <div className=''>
                {profile.reviews.assignedReviews.map((re, index) => {
                  return (
                    <div className='d-flex flex-column small align-items-start col-12 col-sm-6 mx-auto mt-1 border border-info' key={re.reviewToTasker.username + index}>
                      <Link to={`/task/${re.taskId}`}>{re.taskContent}</Link>
                      <TaskReview username={re.reviewToTasker.username} userId={re.reviewToTasker.userId} rating={re.reviewToTasker.rating} message={re.reviewToTasker.message} />
                    </div>
                  )
                })}
              </div>
            }
          </div>

        </div>}
    </>
  )
}
export default Profile
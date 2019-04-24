import * as React from 'react'
import { Link } from 'react-router-dom'
import { SignInStatus } from '../../context/context'
import ModalButton from '../../components/Modal/ModalButton'
import './style.css'
const Home: React.FunctionComponent = () => {
    const { signInStatus } = React.useContext(SignInStatus);
    const [role, setRole] = React.useState('poster')
    return (
            <div className='home d-flex flex-column justify-content-center align-items-center text-center '>
            <div className='text-center m-2 '>
                <span className={role === "poster" ? `profile-nav text-white bg-info rounded p-1 m-1` : 'profile-nav text-info bg-white border-info border rounded p-1 m-1'} onClick={() => { setRole('poster') }}>As Poster</span>
                <span className={role === "tasker" ? `profile-nav text-white bg-info rounded p-1 m-1` : 'profile-nav text-info bg-white border-info border rounded p-1 m-1'} onClick={() => { setRole('tasker') }}>As Tasker</span>
            </div>
                {role === 'poster' && <div className={'description-active d-flex flex-column align-items-center justify-content-around'}>
                    <div className=''>
                        <div className='bg-white shadow-sm rounded-pill p-3 font-weight-bold '>When you need something but cannot go to buy</div>
                        {signInStatus.isSignIn ?
                            <div className='p-1 btn btn-info btn-sm rounded-pill mt-2'><ModalButton target="postATask">Post A Task</ModalButton></div>
                            :
                            <div className="btn-group py-2">
                               <div className='p-1 btn btn-info btn-sm mt-2'> <ModalButton target="signIn">Sign In</ModalButton></div>
                               <div className='p-1 btn btn-info btn-sm mt-2'><ModalButton target="signUp">Sign Up</ModalButton></div>
                            </div>
                        }
                    </div>
                    <div className=''>
                        <div className='font-weight-bold bg-white shadow-sm rounded-pill p-3 '> Wait a Buyer to take the task</div>
                        <div className='d-inline-block text-warning text-center mt-2 ' >Task Assigned</div>
                    </div>
                    <div className=''>
                        <div className='bg-white shadow-sm rounded-pill p-3 font-weight-bold'> Wait the buyer to deliver it before the due time</div>
                        <div className='d-inline-block font-weight-bold text-danger text-center mt-2 '>Task Done</div>
                    </div>
                    <div className=' '>
                        <div className='bg-white shadow-sm rounded-pill p-3  font-weight-bold'> Get things and Pay the buyer</div>
                        <div className='d-inline-block p-1 mt-2  bg-info text-white text-center border border-muted rounded'>Completed Task</div>
                        <div className="d-inline-block p-1 mt-2  bg-info text-white text-center border border-muted rounded">Leave reviews</div>
                    </div>

                </div>}
                {role === 'tasker' && <div className={'description-active d-flex flex-column align-items-center justify-content-around'}>
                    <div className=''>
                        <div className='font-weight-bold bg-white shadow-sm rounded-pill p-3 '> When you want some money in the way home</div>
                        <div className='p-1 mt-2 btn btn-info btn-sm rounded-pill '><Link to="/tasks" className=' text-white text-decoration-none'>Browse Tasks</Link></div>
                    </div>

                    <div className=''>
                        <div className='font-weight-bold bg-white shadow-sm rounded-pill p-3 '>Find a task near to your destination</div>
                        <div className='d-inline-block p-1 mt-2 bg-success text-white text-center border border-muted rounded'>Take the task</div>
                    </div>

                    <div className=''>
                        <div className='font-weight-bold bg-white shadow-sm rounded-pill p-3'>Buy what the poster wants and deliver</div>
                        <div className='d-inline-block p-1 mt-2 bg-danger text-white text-center border border-muted rounded'>Done the Task</div>
                    </div>

                    <div className=''>
                        <div className='font-weight-bold bg-white border border-muted rounded-pill p-3'>Get Money you deserve to</div>
                        <div className='d-inline-block p-1 mt-2 bg-white text-info text-center border border-muted rounded'>Task Completed</div>
                        <div className="d-inline-block p-1 mt-2 bg-info text-white text-center border border-muted rounded">Leave reviews</div>
                    </div>


                </div>}
            </div>
    )
}
export default Home
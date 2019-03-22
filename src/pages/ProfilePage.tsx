import * as React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {SignInStatus,Update} from '../middleware/context'
import useGetData from '../middleware/customHooks/useGetData'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
<<<<<<< HEAD:src/pages/ProfilePage.tsx
type Props = {
    match:{
        params:
        {id:string}
    }
}
const Profile:React.FunctionComponent<Props> = (props)=>{
    const {signInStatus} = React.useContext(SignInStatus);
    // const [postedTask,fetchStatus,dispatch] = useGetData(`http://localhost:5000/tasks?poster=${props.match.params.id}`);
    // const [assignedTask] = useGetData(`http://localhost:5000/tasks?assignTo=${props.match.params.id}`)
=======
const Profile = (props)=>{
    const [signInStatus] = useContext(SignInStatus);
    const [postedTask,dispatch] = useGetData([],`http://localhost:5000/tasks?poster=${props.match.params.id}`);
    const [assignedTask] = useGetData([],`http://localhost:5000/tasks?assignTo=${props.match.params.id}`)
>>>>>>> 9d167765d16a6ecbb97bb1dcd31ef8e2ff9aeb43:src/pages/ProfilePage.jsx

    const handleComplete = async(input:string)=>{
       await axios.patch(`http://localhost:5000/tasks/${input}`,{status:`DONE`})
    //    dispatch(startUpdate)
    }

    return (
        <div>
            My Profile 
        <div>
            {signInStatus.isSignIn?`welcome,${signInStatus.username},you can view your detail`:'Please signIn first or signUp'}
        </div>
        <div className='row'>
        {/* <div className='col-6'>
            <h4>Posted Tasks</h4>        
            {postedTask.map((data)=>{
                return (
                <div className='' key={data.id} >
                    <TaskList {...data}   />
                </div>)
            })}
        </div> */}
        {/* <div className='col-6'>
            <h4>Assigned Tasks</h4>        
            {assignedTask.map((data)=>{
                return (
                <div className='' key={data.id} >
                    <TaskList {...data} click={handleComplete}/>
                </div>)
            })} 
        </div> */}
        </div>
        
        <div>
            {!signInStatus.isSignIn &&  <>
                <Link to='/Signin'>Signin</Link>
                <Link to='/SignUp'>SignUp</Link>
                </>}  
        </div>
        </div>
    )
}
export default Profile
import * as React from 'react';
import useGetData from '../middleware/customHooks/useGetData'
import { SignInStatus} from '../middleware/context'
interface ITaskItem {
    role:string;
    filter:string;
}
const initialVale = {
    postedBy:'',
    postedTime:'',
    what:'',
    where:'',
    when:'',
    price:'',
    time:'',
    detail:'',
    status:'',
    assignedTo:'',
    assignedTime:'',
    id:'',
} 
type Task = typeof initialVale

const TaskItem = ({role,filter}:ITaskItem)=>{
    const { signInStatus } = React.useContext(SignInStatus);
    const username = signInStatus.username;
    const url = role === 'poster' ? `http://localhost:5000/tasks?postedBy=${username}&?status=${filter}` : `http://localhost:5000/tasks?assignedTo=${username}?status=${filter}`
    const [data,fetchStatus,updateDispatch] = useGetData([initialVale],url);
    const element = data.map(d=>{return <tr key={d.id}><td>{d.id}</td></tr>}) 
    return (
        <>
            {fetchStatus ? element : "data is loading"}
        </>
    )
}
export default TaskItem
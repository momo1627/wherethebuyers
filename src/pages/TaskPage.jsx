import React,{useState,useContext,useEffect} from 'react'
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
import TaskLabel from '../components/TaskLabel'
import TaskDetailsPage from './TaskDetailsPage'
import {startUpdate,endUpdate} from '../middleware/actions/updateAction'
import useGetData from '../middleware/customHooks/useGetData'
const Task = ()=>{
    const [data,dispatch] = useGetData([],'http://localhost:5000/tasks')
    const handleClick = ()=>{
        dispatch(startUpdate)
    }
    return (
        <Router>
            <div className='row' style={{"height":"82vh"}}>
                    <div className='col-4'>
                            {data.map(item => (
                                <Link  key={item.id}  className="text-dark text-decoration-none" to={`/tasks/${item.id}`} onClick={()=>{handleClick(item.id)}}>
                                    <TaskLabel  {...item} click={handleClick} />
                                </Link>
                        ))}
                    </div>
                    <div className='col-8'>
                        <Route exact path='/tasks/:id' component={TaskDetailsPage}/>
                </div>
            </div>
        </Router>
    )
}
export default Task
import React,{useState,useContext,useEffect} from 'react'
import {TaskList} from '../middleware/context'
import {getTaskList} from '../middleware/requestApi/index'
import axios from 'axios'
import TaskLabel from '../components/TaskLabel'
const Task = ()=>{
    const [data, setData] = useState([]);
    const getData = async()=>{
        const result = await axios(
            'http://localhost:4000/tasks',
          );
          setData(result.data);
    }
    useEffect(()=>{getData()},[])
    return (
        <div>
            <h1>a list of task </h1>
            {data.map(item => (
                <TaskLabel key={item.id} {...item} />
            ))}
        </div>
    )
}
export default Task
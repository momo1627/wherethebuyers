import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import TaskDetail from '../TaskDetail/TaskDetailsPage';
import TaskFilter from './TaskFilter'
import TaskListContainer from './TaskListContainer';
import Home from '../HomePage/HomePage'
import './style.css'
type TParams = { id: string }
const Tasks: React.FunctionComponent<RouteComponentProps<TParams>> = ({ match, history }) => {
    const [query, setQuery] = React.useState('');
    return (
        <div className='task-container'>
            <TaskFilter query={query} handleQuery={setQuery} />
            <TaskListContainer query={query} />
        </div>
    )
}
export default Tasks
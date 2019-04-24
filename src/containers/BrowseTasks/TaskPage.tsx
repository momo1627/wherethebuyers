import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import { Update } from '../../context/context'
import Loading from '../../components/Loading'
import TaskDetail from '../TaskDetail/TaskDetailsPage';
import TaskFilter from './TaskFilter'
import Home from '../HomePage/HomePage'
import TaskNav from './TaskNav'
import './style.css'
import API_Url from '../../constants/api'

//1.initial fetch get task list and searchBeforeId searchAfterId
//-- store tasks list, searchBeforeId searchAfterId
//pass tasklist to taks nav to render
//2.next fetch  task list after searchAfterId
//-- fetch with searchAfterId
//-- store newTaskList, newtasknumber, pass newTasknumber to notification 
//-- 
//2.1 if new tasks give notification and click it to render new task
//2.1.1 if click to get load new re-render task nav pass new , clear data here
//2.2 2 if not click to get new task, 
//2.2 if no task, wait to init new tasks
interface IProp {
    match: {
        params: {
            id: string
        }
    }
    history: {}
    location: {
        pathname: string
    }
}
const Tasks = (props: IProp) => {
    const [initTaskList, setInitTaskList] = React.useState();
    const [response, setResponse] = React.useState({ status: false, message: '' })

    const [hasMoreTask, setHasMoreTask] = React.useState();
    const [searchAfterId, setSearchAfterId] = React.useState();
    const [searchBeforeId, setSearchBeforeId] = React.useState();
    const [totalTask, setTotalTask] = React.useState(0);

    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isDataLoading, setIsDataLoading] = React.useState(false);

    const [isScrolled, setIsScrolled] = React.useState(0);
    const [isMoreDataLoading, setIsMoreDataLoading] = React.useState(false);

    const [newTaskList, setNewTaskList] = React.useState([]);
    const [newTaskNumber, setNewTaskNumber] = React.useState(0);

    const { update, updateDispatch } = React.useContext(Update)
    const [filter, setFilter] = React.useState('')
    const fetchData = async () => {
        setInitTaskList([]);
        setIsDataLoading(true);
        setIsDataLoaded(false)
        const result = await fetch(`${API_Url}/tasks?pageSize=8${filter}`, { method: 'get' });
        const json = await result.json();
        if (result.ok) {
            setInitTaskList(json.data.tasks);
            setResponse({ status: result.ok, message: json.message });
            setSearchAfterId(json.data.meta.searchAfterId);
            setSearchBeforeId(json.data.meta.searchBeforeId);
            setHasMoreTask(json.data.meta.hasNext)
            setTotalTask(json.data.length);
            setIsDataLoaded(true);
            setIsDataLoading(false)
        } else {
            setIsDataLoaded(true);
            setIsDataLoading(false);
            setResponse({ status: result.ok, message: json.message })
        }
    }
    React.useEffect(() => {
        fetchData();
    }, [filter])
    const fetchNewData = async (searchAfterId: string) => {
        if (!searchAfterId) { return }
        const result = await fetch(`${API_Url}/tasks?searchAfterId=${searchAfterId}${filter}`, { method: 'get' });
        const json = await result.json();
        if (result.ok) {
            setNewTaskList(json.data.tasks.concat(newTaskList));
            setNewTaskNumber((s) => s + json.data.meta.total);
            setSearchAfterId(json.data.meta.searchAfterId);
        }
    }
    React.useEffect(() => {
        const fresh = setInterval(() => {
            fetchNewData(searchAfterId)
        }, 10000);
        return function clear() {
            clearInterval(fresh)
        }
    }
    )
    const addNewTasks = () => {
        setInitTaskList([...newTaskList, ...initTaskList])
        setNewTaskNumber(0);
        setNewTaskList([])
        setTotalTask(initTaskList.length)
    }
    const fetchMoreData = async (searchBeforeId: string) => {
        setIsMoreDataLoading(true);
        const result = await fetch(`${API_Url}/tasks?pageSize=2&searchBeforeId=${searchBeforeId}${filter}`, { method: 'get' });
        const json = await result.json();
        if (result.ok) {
            setSearchBeforeId(json.data.meta.searchBeforeId);
            setTotalTask(initTaskList.length);
            setTimeout(() => {
                setInitTaskList([...initTaskList, ...json.data.tasks]);
                setHasMoreTask(json.data.meta.hasNext);
                setIsMoreDataLoading(false);
            }, 1000)
        } else {
            setHasMoreTask(false)
            setIsMoreDataLoading(false);
        }
    }
    const elem = document.getElementsByClassName('task-item-container')[0]
    const handleScroll = () => {
        setIsScrolled(elem.scrollTop);
        if (!isMoreDataLoading) {
            if (elem.scrollTop + elem.clientHeight > elem.scrollHeight - 10) {
                if (hasMoreTask) {
                    fetchMoreData(searchBeforeId);
                }
            }
        }

    }
    const backToTop = () => {
        elem.scrollTop = 0;
        setIsScrolled(0)
    }
    React.useEffect(() => {
        document.getElementsByClassName('task-item-container')[0].addEventListener('scroll', handleScroll);
        return function clear() {
            document.getElementsByClassName('task-item-container')[0].removeEventListener('scroll', handleScroll);
        }
    })
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <TaskFilter filter={filter} handleFilter={setFilter} />
                {window.location.pathname.length > 10 && <button className='d-md-none btn btn-sm py-0 btn-info text-white' onClick={() => { history.back() }}>&#8678;</button>}
            </div>
            <div className='task-container' >
                <div className='task-right'>
                    <div className={window.location.pathname.length < 10 ? 'task-detail-container-empty ' : 'task-detail-container'}>
                        {window.location.pathname.length > 10 ? <Route exact path='/tasks/:id' component={TaskDetail} /> : <div className='home-container d-none d-md-block'><Home /></div>}
                    </div>
                </div>
                <div className='task-nav px-1'>
                    {newTaskNumber > 0 && <button className='text-white bg-info tasks-new' onClick={addNewTasks}>{newTaskNumber} NEW TASKS</button>}
                    <div className="task-item-container" id="task-item-container">
                        {isScrolled > 0 && <button className='btn btn-sm btn-primary tasks-top' onClick={backToTop}>Top</button>}
                        {isDataLoading && !isDataLoaded && <Loading />}
                        {response.status && <TaskNav initTasks={initTaskList} click={() => { updateDispatch(startUpdate) }} />}
                        {isDataLoaded && <div className="tasks-loading border rounded shadow-sm bg-white font-weight-bold text-center mx-2 h6">
                            {hasMoreTask ? <Loading /> : <div>no more tasks</div>}
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Tasks
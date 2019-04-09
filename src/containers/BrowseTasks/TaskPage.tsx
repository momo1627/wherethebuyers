import * as React from 'react'
import TaskNav from './TaskNav'
import API_Url from '../../constants/api'
import './style.css'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import Loading from '../../components/Loading'
import { Update } from '../../context/context'
//1.initial fetch get task list and searchBeforeId searchAfterId
//-- store tasks list, searchBeforeId searchAfterId
//pass tasklist to taks nav to render
//2.next fetch  task list after searchAfterId
//-- fetch with searchAfterId
//-- store newTaskList, newtasknumber, pass newTasknumber to notification 
//-- 
//2.1 if new tasks give notification and click it to render new task
//2.1.1 if click to get load new re-render task nav pass new props, clear data here
//2.2 2 if not click to get new task, 
//2.2 if no task, wait to init new tasks
const Tasks = () => {
    const [checked,setChecked] = React.useState(false);
    const [location,setLocation] = React.useState('')
    const { update, updateDispatch } = React.useContext(Update)
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isDataLoading, setIsDataLoading] = React.useState(false);
    const [isMoreDataLoading, setIsMoreDataLoading] = React.useState(false);
    const [initTaskList, setInitTaskList] = React.useState();
    const [searchAfterId, setSearchAfterId] = React.useState();
    const [searchBeforeId, setSearchBeforeId] = React.useState();
    const [newTaskList, setNewTaskList] = React.useState([]);
    const [newTaskNumber, setNewTaskNumber] = React.useState(0);
    const [totalTask, setTotalTask] = React.useState(0);
    const [hasMoreTask, setHasMoreTask] = React.useState(true);
    const [isScrolled, setIsScrolled] = React.useState(0);
    let filter = '';
        if(checked){
            filter = 'status=OPEN&'
        }
    
    const fetchData = async () => {
        const result = await fetch(`${API_Url}/tasks?${filter}`, { method: 'get' });
        const json = await result.json();
        setIsDataLoading(true);
        setIsDataLoaded(false)
        setInitTaskList(json.data.tasks);
        setSearchAfterId(json.data.meta.searchAfterId);
        setSearchBeforeId(json.data.meta.searchBeforeId);
        setTotalTask(json.data.length);
        setTimeout(() => { setIsDataLoaded(true); setIsDataLoading(false) }, 1500)
    }
    const fetchNewData = async (searchAfterId: string) => {
        if (!searchAfterId) { return }
        const result = await fetch(`${API_Url}/tasks?searchAfterId=${searchAfterId}&${filter}`, { method: 'get' });
        const json = await result.json();
        if (json.status === 0) {
            setNewTaskList(json.data.tasks.concat(newTaskList));
            setNewTaskNumber((s) => s + json.data.meta.total);
            setSearchAfterId(json.data.meta.searchAfterId);
        }
    }
    const fetchMoreData = async (searchBeforeId: string) => {
        if (!searchBeforeId) { return }
        const result = await fetch(`${API_Url}/tasks?searchBeforeId=${searchBeforeId}&${filter}&`, { method: 'get' });
        const json = await result.json();
        if (json.status === 0) {
            setHasMoreTask(json.data.meta.hasNext);
            setSearchBeforeId(json.data.meta.searchBeforeId);
            setInitTaskList([...initTaskList, ...json.data.tasks]);
            setTotalTask(initTaskList.length);
        }
    }
    React.useEffect(() => {
        fetchData();
        updateDispatch(endUpdate)
    }, [update])
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
    const elem = document.getElementsByClassName('task-item-container')[0]
    const handleScroll = () => {
        setIsScrolled(elem.scrollTop);
        if (elem.scrollTop + elem.clientHeight > elem.scrollHeight - 5) {
            if (hasMoreTask) {
                setIsMoreDataLoading(true);
                setTimeout(() => {
                    fetchMoreData(searchBeforeId);
                    setIsMoreDataLoading(false);
                }, 1500)
            }

        }
        console.log(elem.scrollTop)
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

        <div className='tasks-container'>
            <div className="custom-control custom-checkbox d-flex align-items-center text-center justify-content-around">
                <input type="checkbox" checked={checked} onChange={()=>{setChecked((pre)=>!pre);updateDispatch(startUpdate);setHasMoreTask(true)}} className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label " htmlFor="customCheck1">Show OPEN Only</label>
            </div>  
            {newTaskNumber > 0 && <button className='alert alert-info tasks-new' onClick={addNewTasks}>{newTaskNumber} NEW TASKS</button>}
                <div className="task-item-container" id="task-item-container">
                    {isScrolled > 0 && <button className='btn btn-sm btn-primary tasks-top' onClick={backToTop}>Top</button>}
                    {isDataLoading && !isDataLoaded && <Loading />}
                    {!isDataLoading && isDataLoaded && <TaskNav initTasks={initTaskList} hasMoreTasks={hasMoreTask} isLoadingMoreData={isMoreDataLoading} />}
                </div>
            </div>
            )
        }
export default Tasks
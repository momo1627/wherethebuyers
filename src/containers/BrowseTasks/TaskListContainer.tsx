import * as React from 'react'
import Loading from '../../components/Loading'
import TaskList from './TaskList'
import API_Url from '../../constants/api'
import TaskPolling from './TaskPolling'
import {initTaskList } from './actions/tasksList'
import { updateMeta } from './actions/taskMeta'
import { taskListReducer, initialTaskList } from './reducers/TaskList';
import { initialTaskMeta, taskMetaReducer } from './reducers/TaskMeta'
import './style.css'

const TaskListContainer = ({ query }) => {
    const [fetchStatus, setFetchStatus] = React.useState({ isLoading: false, isLoaded: false, isError: false })
    const [taskList, taskListDispatch] = React.useReducer(taskListReducer, initialTaskList);
    const [taskMeta, taskMetaDispatch] = React.useReducer(taskMetaReducer, initialTaskMeta);
    const fetchData = React.useCallback(
        async (url, option) => {
            const response = await fetch(url, option);
            const result = await response.json();
            return result.data;
        }, [])

    React.useEffect(() => {
        setFetchStatus({ isLoading: true, isLoaded: false, isError: false })
        fetchData(`${API_Url}/tasks?pageSize=8${query}`, { method: 'get' }).then(
            (res) => {
                taskListDispatch(initTaskList(res.tasks));
                taskMetaDispatch(updateMeta(res.meta));
                setFetchStatus({ isLoading: false, isLoaded: true, isError: false })
            },
            () => {
                setFetchStatus({ isLoading: false, isLoaded: true, isError: true })
            }
        );
    }, [query])
    return (
        <>
            <TaskPolling
                searchAfterId={taskMeta.searchAfterId}
                updateTaskList={taskListDispatch}
                updateTaskMeta={taskMetaDispatch}
                query={query}
            />
            {fetchStatus.isLoaded &&
                <TaskList
                    tasks={taskList.taskList}
                    hasMore={taskMeta.hasNext}
                    query={query}
                    searchBeforeId={taskMeta.searchBeforeId}
                    updateTaskList={taskListDispatch}
                    updateTaskMeta={taskMetaDispatch}
                />}
            {fetchStatus.isLoading && <Loading />}
        </>
    )
}
const areEqual = (prevProps, nextProps) => {
    return nextProps.query === prevProps.query
}
export default React.memo(TaskListContainer, areEqual)
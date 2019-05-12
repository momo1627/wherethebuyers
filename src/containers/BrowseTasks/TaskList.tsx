import * as React from 'react'
import TaskItem from './TaskItem'
import Loading from '../../components/Loading'
import { addMoreTask } from './actions/tasksList'
import { updateMeta } from './actions/taskMeta'
import API_Url from '../../constants/api'
const TaskList = ({query, tasks, hasMore, searchBeforeId, updateTaskList, updateTaskMeta }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const container = React.useRef<HTMLDivElement>();
    const fetchData = React.useCallback(
        async (url, option) => {
            const response = await fetch(url, option);
            const result = await response.json();
            return result.data;
        }, [])
    const handleScroll = React.useCallback(async () => {
        if (!isLoading) {
            if (container.current.scrollTop + container.current.clientHeight > container.current.scrollHeight - 10) {
                if (hasMore) {
                    setIsLoading(true);
                    const data = await fetchData(`${API_Url}/tasks?pageSize=8&searchBeforeId=${searchBeforeId}${query}`, { method: 'get' })
                    updateTaskList(addMoreTask(data.tasks));
                    updateTaskMeta(updateMeta(data.meta));
                    setIsLoading(false);
                }
            }
        }
    }, [isLoading, searchBeforeId,query])
    const backToTop = React.useCallback(() => {
        container.current.scrollTo(0, 0);
    }, [])
    const element = tasks && tasks.map((item) => {
        return (
            <TaskItem key={item._id} {...item} />
        )
    })
    return (
        <div className="task-item-container"  ref={container} onScroll={handleScroll}>
            {<button className='btn btn-sm btn-primary tasks-top' onClick={backToTop}>Top</button>}
            {element}
            <div className="tasks-loading border rounded shadow-sm bg-white font-weight-bold text-center mx-2 h6">
                {hasMore ? <Loading /> : <div>no more tasks</div>}
            </div>
        </div>
    )
}
export default React.memo(TaskList) 
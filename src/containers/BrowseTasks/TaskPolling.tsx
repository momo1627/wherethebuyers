import * as React from 'react';
import { addNewTask } from './actions/tasksList'
import { updateMeta } from './actions/taskMeta'
import API_Url from '../../constants/api'
const TaskPolling = ({query, searchAfterId, updateTaskList, updateTaskMeta }) => {
  const [newTasks, setNewTasks] = React.useState({ taskList: [], searchAfterId: searchAfterId });
  const total = newTasks.taskList.length;
  const fetchData = React.useCallback(
    async (url, option) => {
      const response = await fetch(url, option);
      const result = await response.json();
      return result.data;
    }, [])
  React.useEffect(() => {
    if (!searchAfterId) { return }
    const poll = setInterval(() => {
      fetchData(`${API_Url}/tasks?pageSize=8&searchAfterId=${searchAfterId}${query}`, { method: 'get' }).then(
        (res) => {
          if (res.tasks.length > 0) {
            setNewTasks({ taskList: res.tasks, searchAfterId: res.meta.searchAfterId });
          }
        },
      );
    }, 10000);
    return () => {
      clearInterval(poll)
    }
  })
  const addNewTasksToTaskList = React.useCallback(() => {
    updateTaskList(addNewTask(newTasks.taskList));
    updateTaskMeta(updateMeta(newTasks.searchAfterId))
  }, [newTasks.taskList, newTasks.searchAfterId])
  return (
    <div>
      { total > 0 && <button onClick={addNewTasksToTaskList}>Add {total} new tasks</button>}
    </div>
  )
}
export default TaskPolling;
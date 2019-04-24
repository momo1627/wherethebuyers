import * as React from 'react'
import TaskList from './TaskList'
import Pagination from './Pagination'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import Loading from '../../components/Loading'
import { Update } from '../../context/context'
import TaskSorted from './TaskSorted'
import './style.css'
import API_Url from '../../constants/api'

interface Pagination {
    currentPage: string,
    pageSize: number,
    total: number,
    hasNext: boolean,
    hasPrev: boolean,
}
const defaultPagination = {
    currentPage: '1',
    pageSize: 4,
    total: 0,
    hasNext: false,
    hasPrev: false,
}
const Mytasks = () => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isDataLoading, setIsDataLoading] = React.useState(false);
    const [data, setData] = React.useState();
    const [response, setResponse] = React.useState({ status: false, message: '' })
    const [pagination, setPagination] = React.useState<Pagination>(defaultPagination)

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5)
    const [role, setRole] = React.useState('poster')
    const [filter, setFilter] = React.useState('ALL')
    const [sort, setSort] = React.useState('&sort=_id')

    const { update, updateDispatch } = React.useContext(Update)

    const fetchData = async () => {
        if (update) { updateDispatch(endUpdate) }
        setIsDataLoaded(false);
        setIsDataLoading(true);
        const result = await fetch(`${API_Url}/profile?role=${role}&status=${filter}&page=${page}&pageSize=${pageSize}${sort}`, { method: 'get', credentials: 'include' })
        const resultJson = await result.json();
        if (result.ok) {
            setData(resultJson.data.tasks);
            setPagination(resultJson.data.pagination);
            setResponse({ status: result.ok, message: resultJson.message });
            setIsDataLoaded(true);
            setIsDataLoading(false);
        } else {
            setIsDataLoaded(true);
            setIsDataLoading(false);
            setResponse({ status: result.ok, message: resultJson.message });
        }
    }
    React.useEffect(
        () => { fetchData() }
        , [filter, role, page, update,sort])
    const refresh = () => {
        setResponse({ status: false, message: '' })
        setPage(1);
    }
    return (
        <div className='my-tasks'>
            <div className='my-tasks-container'>
                <nav className='my-2 my-tasks-nav text-center'>
                    <div className={role === 'poster' ? 'bg-info text-white w-50 d-inline-block' : 'text-info w-50 d-inline-block'} onClick={(e) => { refresh(); setRole('poster'); }}>As Poster</div>
                    <div className={role === 'tasker' ? 'bg-info text-white w-50 d-inline-block' : 'text-info w-50 d-inline-block'} onClick={(e) => { refresh(); setRole('tasker'); }}>As Tasker</div>
                </nav>
                <div className='d-flex justify-content-around'>
                    <select className="small w-50" value={filter} onChange={(e) => { refresh(); setFilter(e.target.value); }}>
                        <option className="small" value="ALL">All Tasks</option>
                        <option className="small" value="PENDING">Pending Tasks</option>
                        <option className="small" value="COMPLETED">Completed Tasks</option>
                    </select>
                    <TaskSorted sort={sort} handleSort={(i: string) => { setSort(i) }} />
                </div>
                {isDataLoading && !isDataLoaded && <Loading />}
                {!isDataLoading && isDataLoaded && <TaskList data={data} role={role} />}
                {!isDataLoading && isDataLoaded && !response.status && <div>not any tasks yet</div>}

                <Pagination {...pagination} click={(i: number) => { setPage(i) }} />
            </div>
        </div>
    )
}
export default Mytasks
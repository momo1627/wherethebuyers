import * as React from 'react'
import TaskList from './TaskList'
import API_Url from '../../constants/api'
import Pagination from './Pagination'
import './style.css'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import Loading from '../../components/Loading'
import { Update } from '../../context/context'
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
    const [pageSize, setPageSize] = React.useState(4)
    const [role, setRole] = React.useState('poster')
    const [filter, setFilter] = React.useState('ALL')

    const { update, updateDispatch } = React.useContext(Update)

    const fetchData = async () => {
        if (update) { updateDispatch(endUpdate) }
        setIsDataLoaded(false);
        setIsDataLoading(true);
        const result = await fetch(`${API_Url}/profile?role=${role}&status=${filter}&page=${page}&pageSize=${pageSize}`, { method: 'get', credentials: 'include' })
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
        , [filter, role, page, update])
    const refresh = () => {
        setResponse({ status: false, message: '' })
        setPage(1);
    }
    return (
            <div className='task-item-container'>
                <nav className='d-flex justify-content-around align-items-center'>
                    <ul className="nav nav-pills bg-light py-2" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="poster-tab" data-toggle="tab" href="#poster" role="tab" aria-controls="poster" aria-selected="true" onClick={(e) => { e.preventDefault(); refresh(); setRole('poster'); }}>Poster</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tasker-tab" data-toggle="tab" href="#tasker" role="tab" aria-controls="tasker" aria-selected="false" onClick={(e) => { e.preventDefault(); refresh(); setRole('tasker'); }}>Tasker</a>
                        </li>
                    </ul>
                    <select className="w-50 form-control form-control-sm " value={filter} onChange={(e) => { refresh(); setFilter(e.target.value); }}>
                        <option value="ALL">All Tasks</option>
                        <option value="PENDING">Pending Tasks</option>
                        <option value="COMPLETED">Completed Tasks</option>
                    </select>
                </nav>
                <Pagination {...pagination} click={(i: number) => { setPage(i) }} />
                {isDataLoading && !isDataLoaded && <Loading />}
                {!isDataLoading && isDataLoaded && response.status && <TaskList data={data} role={role} /> }
                {!isDataLoading && isDataLoaded && !response.status && <div>not any tasks yet</div> }
            </div>
    )
}
export default Mytasks
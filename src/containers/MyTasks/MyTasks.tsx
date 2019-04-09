import * as React from 'react'
import TaskList from './TaskList'
import API_Url from '../../constants/api'
import Pagination from './Pagination'
import './style.css'
import { startUpdate, endUpdate } from '../../actions/updateAction'
import Loading from '../../components/Loading'
import { Update } from '../../context/context'

type Role = string;
const Mytasks = () => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [isDataLoading, setIsDataLoading] = React.useState(false);
    const { update, updateDispatch } = React.useContext(Update)
    const [role, setRole] = React.useState<Role>('poster')
    const [filter, setFilter] = React.useState('ALL')
    const [data, setData] = React.useState();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(5)
    const [pagination, setPagination] = React.useState({ hasPrev: false, hasNext: true })

    const fetchData = async () => {
        if (update) { updateDispatch(endUpdate) }
        setIsDataLoaded(false);
        setIsDataLoading(true);
        const result = await fetch(`${API_Url}/profile?role=${role}&status=${filter}&page=${page}&pageSize=${pageSize}`, { method: 'get', credentials: 'include' })
        const resultJson = await result.json();
        setData(resultJson.data.tasks);
        setPagination(resultJson.data.pagination)
        setTimeout(() => { setIsDataLoaded(true); setIsDataLoading(false) }, 1000)
    }
    React.useEffect(
        () => { fetchData() }

        , [filter, role, page, update])
    const refresh = () => {
        setPage(1);
        setPagination({ hasPrev: false, hasNext: true })
    }
    return (
        <main className="my-tasks">
            <div>
                <nav className='d-flex justify-content-around align-items-center'>
                    <ul className="nav nav-pills bg-light py-2" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="poster-tab" data-toggle="tab" href="#poster" role="tab" aria-controls="poster" aria-selected="true" onClick={(e) => { e.preventDefault(); refresh(); setRole('poster') }}>Poster</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tasker-tab" data-toggle="tab" href="#tasker" role="tab" aria-controls="tasker" aria-selected="false" onClick={(e) => { e.preventDefault(); refresh(); setRole('tasker') }}>Tasker</a>
                        </li>
                    </ul>
                    <ul className="d-none d-sm-flex nav nav-pills bg-light py-2 " id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="all-tab" data-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true" onClick={(e) => { e.preventDefault(); refresh(); setFilter('ALL') }}>All Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="assigned-tab" data-toggle="tab" href="#assigned" role="tab" aria-controls="assigned" aria-selected="false" onClick={(e) => { e.preventDefault(); refresh(); setFilter('PENDING') }}>Pending Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="completed-tab" data-toggle="tab" href="#completed" role="tab" aria-controls="completed" aria-selected="false" onClick={(e) => { e.preventDefault(); refresh(); setFilter('COMPLETED') }}>Completed Tasks</a>
                        </li>
                    </ul>
                    <select className="d-sm-none w-50 form-control form-control-sm " onChange={(e) => {setFilter(e.target.value);refresh()}}>
                        <option value="ALL">All Tasks</option>
                        <option value="PENDING">Pending Tasks</option>
                        <option value="COMPLETED">Completed Tasks</option>
                    </select>
                </nav>
                <Pagination page={page} hasPrev={pagination.hasPrev} hasNext={pagination.hasNext} click={(i: number) => { setPage(i) }} />
                {isDataLoading && !isDataLoaded && <Loading />}
                {!isDataLoading && isDataLoaded &&
                    <>
                        <TaskList data={data} role={role} />
                    </>
                }
            </div>
        </main>
    )
}
export default Mytasks
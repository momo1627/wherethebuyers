import * as React from 'react'
import Autocompleted from '../../components/GoogleMap/Autocompleted'
import { stat } from 'fs';
interface IProps {
    filter: string;
    handleFilter: (i: string) => void
}
const TaskFilter = (props: IProps) => {
    const [isShow, setIsShow] = React.useState(false);
    const [openOnly, setOpenOnly] = React.useState(false);
    const [location, setLocation] = React.useState('');
    const handleFilter = () => {
        setIsShow((prev) => !prev)
    }
    const handleApply = () => {
        const status = openOnly ? '&status=OPEN' : ''
        const where = location.length > 0 ? `&where=${location}` : ''
        props.handleFilter(status.concat(where));
        setIsShow(false)
    }
    const handleReset = () => {
        props.handleFilter('');
        setOpenOnly(false);
        setLocation('');
        setIsShow(false)
    }
    return (
        <div className={`tasks-filter-container px-2 mt-1 `}>
            <span className="filter-button px-2 dropdown-toggle font-weight-bold" onClick={handleFilter} >Filter tasks</span>
            {isShow && <div className='filter-modal-container'>
                <div className='tasks-filter-content d-flex flex-column justify-content-around align-items-center p-1 shadow'>
                    <div className="custom-control custom-checkbox d-flex align-items-center text-center justify-content-around">
                        <input type="checkbox" checked={openOnly} onChange={() => { setOpenOnly((pre) => !pre); }} className="custom-control-input " id="customCheck1" />
                        <label className="custom-control-label text-info " htmlFor="customCheck1">Show OPEN Only</label>
                    </div>
                    <div className="">
                        <Autocompleted input={location} setInput={(l: string) => { setLocation(l) }} />
                    </div >
                    <div className='btn-group w-100'>
                        <button className="btn btn-info   p-0" onClick={handleApply}>Apply</button>
                        <button className="btn btn-danger   p-0" onClick={handleReset}>Reset</button>
                    </div>

                </div>
            </div>
            }
        </div>
    )
}
export default TaskFilter
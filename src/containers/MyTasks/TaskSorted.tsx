import * as React from 'react'
interface IProps {
    sort: string;
    handleSort: (i: string) => void
}
const TaskSorted = (props: IProps) => {
    const [sort, setSort] = React.useState('')
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
        props.handleSort(`&sort=${e.target.value}`)
    }
    return (
        <select id='select' className=" w-50" value={sort} onChange={handleChange}>
            <option value={`_id`} className=''>Posted Time (Newest)</option>
            <option value={`when`} className=''>Due Time (Nearest)</option>
            <option value={`price`} className=''>Price (Highest)</option>
        </select>
    )
}
export default TaskSorted
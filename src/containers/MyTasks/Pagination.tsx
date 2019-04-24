import * as React from 'react'
interface IProps {
    click: (i: number) => void,
    currentPage: string,
    pageSize: number,
    total: number,
    hasNext: boolean,
    hasPrev: boolean,
}
const Pagination = (props: IProps) => {
    const handleNextPage = () => {
        props.click(parseInt(props.currentPage) + 1)
    }
    const handlePrevPage = () => {
        props.click(parseInt(props.currentPage) - 1)
    }
    return (
        <nav>
            <ul className='pagination-sm pagination mt-2'>
                {<li className='page-item' ><button disabled={!props.hasPrev} className="page-link" onClick={(e) => { e.preventDefault(); handlePrevPage() }} ><span>&laquo;</span></button></li>}
                {props.hasPrev && <li className='page-item'><button disabled={!props.hasPrev} className="page-link" onClick={(e) => { e.preventDefault(); handlePrevPage() }} >{parseInt(props.currentPage) - 1}</button></li>}
                {<li className='page-item active'><button disabled className="page-link" >{props.currentPage}</button></li>}
                {props.hasNext && <li className='page-item'><button disabled={!props.hasNext} className="page-link" onClick={(e) => { e.preventDefault(); handleNextPage() }} >{parseInt(props.currentPage) + 1}</button></li>}
                {<li className='page-item'><button disabled={!props.hasNext} className="page-link" onClick={(e) => { e.preventDefault(); handleNextPage() }}>&raquo;</button></li>}
            </ul>
        </nav>
    )
}
export default Pagination;
import * as React from 'react'
interface IProps{
    page:number;
    hasNext:boolean;
    hasPrev:boolean;
    click:(i:number)=>void
}
const Pagination = (props:IProps)=>{
    const handleNextPage=()=>{
        props.click(props.page+1)
    }
    const handlePrevPage=()=>{
        props.click(props.page-1)
    }

    return(
    <nav>
        <ul className='pagination'>
            {<li className='page-item'><button disabled={!props.hasPrev} className="page-link"  onClick={(e)=>{e.preventDefault();handlePrevPage()}} ><span>&laquo;</span></button></li>}
            {props.hasPrev && <li className='page-item'><button disabled={!props.hasPrev} className="page-link" onClick={(e)=>{e.preventDefault();handlePrevPage()}} >{props.page-1}</button></li>}
            {<li className='page-item active'><button disabled className="page-link" >{props.page}</button></li>}
            {props.hasNext && <li className='page-item'><button disabled={!props.hasNext} className="page-link" onClick={(e)=>{e.preventDefault();handleNextPage()}} >{props.page+1}</button></li>}
            {<li className='page-item'><button disabled={!props.hasNext} className="page-link" onClick={(e)=>{e.preventDefault();handleNextPage()}}>&raquo;</button></li>}
        </ul>
    </nav>
    )
}
export default Pagination;
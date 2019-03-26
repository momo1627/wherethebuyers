import * as React from 'react';
type Row = {
    td1:string,
    td2:string,
    td3:string,
    td4:string,
    td5:string
}
const TaskRow = (props:Row)=>{
    
    return (
        <tr className=''>
            <td className="">{props.td1}</td>
            <td className="">{props.td2}</td>
            <td className="">{props.td3}</td>
            <td className="">{props.td4}</td>
            <td className="">{props.td5}</td>
        </tr>
    )
}
export default TaskRow
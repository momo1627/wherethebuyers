import * as React from 'react';
interface Iprops {
    total: number;
    completed: number;
    ratio:number;
}
const Profile = (props: Iprops) => {
    return (
        <>{
            props.total > 0 ? <div className='p-1'>
                <div><span className='font-weight-bold mr-2'>Completed Rate:</span>{props.ratio.toFixed(1)}% </div>
                <div><span className='font-weight-bold mr-2'>Completed Tasks:</span>{props.completed}</div>
                <div><span className='font-weight-bold mr-2'>Total Tasks:</span>{props.total}</div>
            </div> :
                <div>
                    no tasks related
            </div>
        }
        </>
    )
}
export default Profile
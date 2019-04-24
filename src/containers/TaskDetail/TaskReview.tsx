import * as React from 'react'
import { Link } from 'react-router-dom'
interface Iprops {
    username: string;
    userId: string;
    rating: number;
    message: string;
}
const Review = (props: Iprops) => {
    const rating = (num: any) => {
        let number = Math.round(num)
        return (
            <div className='d-flex flex-row-reverse justify-content-end'>
                {[...Array(number).keys()].map((n) => { return (<span key={n} className='text-info'>★</span>) })}
            </div>
        )
    }
    return (
        <>
            <Link to={`/profile/${props.userId}`} className='text-info'>{props.username}</Link>
            <div className='ml-2'>
                {props.rating && rating(props.rating)}
                <div className=''>{props.message && props.message}</div>
            </div>
        </>
    )
}
export default Review
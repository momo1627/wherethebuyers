import * as React from 'react';
interface Iprops {
    rating: number;
    count: number;
}
const Profile = (props: Iprops) => {
    const rating = (num: any) => {
        let number = Math.round(num)
        return (
            <div className='d-flex justify-content-center'>
                {[...Array(number).keys()].map((n) => { return (<span key={n} className='text-info'>★</span>) })}
            </div>
        )
    }
    return (
        <>{
            props.count > 0 ? <div className='p-1'>
                {rating(props.rating)}
                <div>{props.rating.toPrecision(2)} stars from {props.count} reviews</div>
            </div> :
                <div>
                    no reviews received
            </div>
        }
        </>
    )
}
export default Profile
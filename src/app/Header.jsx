import React from 'react'
import {Link} from 'react-router-dom'
const Header = ()=>{
    return(
        <div>
            <Link to='/'>WhereIsTheBuyer</Link>
            <Link to='/Signin'>Signin</Link>
            <Link to='/SignUp'>SignUp</Link>
        </div>
    )
}
export default Header
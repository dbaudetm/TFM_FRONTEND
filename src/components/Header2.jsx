import React from 'react'
import { Link } from 'react-router-dom'
const Header2 = () => {
    return (
        <>

            <div className=' flex justify-end '>
                <Link className='font-bold p-5  hover:text-blue-500' to={'/public/Login'}>Login</Link>
                <Link className='font-bold p-5  hover:text-blue-500' to={'/public/Register'}>Register</Link>
            </div>


        </>

    )
}

export default Header2
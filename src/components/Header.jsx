import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <>


            <div className='pb-2 grid grid-cols-3 '>
                <div>
                    <h1 className='container w-1/3 md:w-1/3 lg:w-1/3 text-2xl text-blue-700 font-bold ml-1 md:flex md:justify-left lg:text-5xl md:text-3xl'>Evaluate<br />Films</h1>

                </div>
                <div></div>
                <div className=' flex justify-end   '>
                    <Link className='font-bold p-5  hover:text-yellow-500' to={'/public/Login'}>Login</Link>
                    <Link className='font-bold p-5  hover:text-yellow-500' to={'/public/Register'}>Register</Link>
                </div>

            </div>




        </>

    )
}

export default Header
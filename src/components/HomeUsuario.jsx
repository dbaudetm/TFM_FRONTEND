import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { Outlet, Navigate } from 'react-router-dom'
const HomeUsuario = () => {
    const { authLogin, setAuthLogin, deleteAuthLogin } = useLogin()
    const navigate = useNavigate()
    const logout = async () => {
        await localStorage.removeItem('token')
        await localStorage.removeItem('tokenAccess')
        deleteAuthLogin()
        navigate("/")
    }

    const nombre = {

        nombre: authLogin.nombreUsuario


    }
    return (

        <>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 min-h-screen'>
                <div className='lg:w-80 row-span-3 h-full bg-blue-600'>
                    <aside className='   bg-blue-600 '>
                        <ul className='bg-blue-600 '>
                            <h1 className='  md:w-2/3 lg:w-1/2 text-5xl text-white font-bold p-5  '>Evaluate<br />Films</h1>
                            <li className='mb-2'><Link className='font-bold p-5 mb-3 text-white hover:text-yellow-500' to={'/private'}>Busqueda</Link></li>
                            <li className='mb-2'><Link className='font-bold p-5 mb-3 text-white hover:text-yellow-500' to={'myVotes/' + authLogin._id} state={nombre}>Mis votaciones</Link></li>
                            <li className='mb-2'><Link className='font-bold p-5 mb-3 text-white hover:text-yellow-500' to={'myFilms'}>Mis peliculas</Link></li>
                            <li className='mb-2'><Link className='font-bold p-5 mb-3 text-white hover:text-yellow-500' to={'profile'}>Perfil</Link></li>
                            <li><button className='font-bold p-5 text-white hover:text-yellow-500' onClick={logout}>Logout</button></li>
                        </ul>
                    </aside>
                </div>

                <div className='md:col-span-2 lg:col-span-3 p-1 m-5 lg:ml-20 '>
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default HomeUsuario
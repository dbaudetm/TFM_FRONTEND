import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import axios from 'axios'
const MyFilms = () => {

    const [seguidas, setSeguidas] = useState([])
    const [verSeguidas, setVerSeguidas] = useState(true)
    const [vistas, setVistas] = useState([])
    const [verVistas, setVerVistas] = useState(true)
    const { authLogin } = useLogin()
    const [cargado, setCargado] = useState(true)




    useEffect(() => {

        async function cargaDatos() {
            setCargado(true)

            const tokenAccess = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }

            };

            const usuario = await axios.get(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/user`, config)
            const usuarioData = usuario.data







            setSeguidas(usuarioData.arraySeguimiento)
            setVistas(usuarioData.arrayVistas)


        }

        cargaDatos()
        setCargado(false)

    }, [])





    function cambiarLista() {
        console.log("editar1: " + editar)
        if (verSeguidas) {

            setVerSeguidas(false)
            setVerVistas(true)


        } else {

            setVerVistas(false)
            setVerSeguidas(true)


        }
        console.log("editar2: " + editar)

    }

    const salida = (<div className='bg-white rounded-2xl mt-2 mr-2 ml-2 p-2 lg:m-32 '>
        <h1 className='font-bold text-2xl'>Mis peliculas</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 p-2'>
            <div>
                <button className=' mb-2 text-xl font-bold' id="seguidas">Lista seguidas:</button>
                <ul className=' overflow-auto'>
                    {seguidas.length > 0 &&
                        seguidas.map(item => {

                            return <li className='mb-2' key={item.nombre}><Link className='font-bold mb-3 text-blue-600 hover:text-yellow-500' to={'film/' + item.id}>{item.nombre}</Link></li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button className='text-xl font-bold' id="vistas">Lista Vistas:</button>
                <ul className=' overflow-auto'>
                    {vistas.length > 0 &&
                        vistas.map(item => {

                            return <li key={item.nombre}><Link className=' p-1 text-blue-600 font-bold hover:text-yellow-500 hover:font-bold' to={'film/' + item.id}>{item.nombre}</Link></li>

                        })
                    }
                </ul>
            </div>
        </div>
    </div>)

    if (cargado == true) return <Spinner />
    return (

        <>

            {(cargado != false && seguidas && vistas) ? <Spinner /> : salida}

        </>

    )


}

export default MyFilms
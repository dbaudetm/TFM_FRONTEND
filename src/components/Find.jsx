import React, { useState } from 'react'
import { Cards } from './Cards'
import axios from 'axios'
import Spinner from './Spinner'
import useLogin from '../hooks/useLogin'
import { useEffect } from 'react'
import Message from './Message'
export const Find = () => {

    const [busqueda, setBusqueda] = useState('')
    const [resultados, setResultados] = useState([])
    const [cargado, setCargado] = useState(true)
    const { busquedaGuardada } = useLogin()
    const { setBusquedaGuardada } = useLogin()
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)






    useEffect(() => {


        function cargaDatos() {

            if (busquedaGuardada != []) {

                setCargado(false)
                setResultados(busquedaGuardada)
                setCargado(true)


            }




        }


        cargaDatos()

    }, [])

    const findFilms = async (e) => {
        e.preventDefault()
        try {
            setMensaje("")
            setAlerta(true)
            setCargado(false)



            if (busqueda.trim() != undefined || busqueda.trim() != "") {


                setResultados([])
                const tokenAccess = localStorage.getItem('token')
                const qwery = { qwery: busqueda }
                console.log(qwery)
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenAccess}`
                    }, qwery: qwery

                };
                const { data } = await axios.get(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/search/${busqueda}`, config)
                console.log(data.error)
                if (data.error != undefined) {
                    setCargado(true)
                    setMensaje(data.error)
                    setAlerta(true)
                    setTimeout(() => {
                        setMensaje("")
                        setAlerta(false)
                    }, 3000);
                    return
                }
                setResultados(data)
                setBusquedaGuardada(data)
                setCargado(true)







            } else {

                setMensaje("No ha introducido ningun titulo de película")
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);


            }








        } catch (error) {
            setMensaje(error.data)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);
        }

    }



    const salida = (

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 overflow-y-auto lg:ml-20'>

            {(cargado && resultados.message != "No se encontro nada") && resultados.map(pelicula => {
                return < Cards key={pelicula._id} peliculaEntrada={pelicula} />

            })

            }

        </div>


    )






    return (
        <>
            <div className='mb-2'>

                <form className='bg-white p-10 w-full sm:p-2 shadow-lg rounded-md lg:ml-20' onSubmit={findFilms}>
                    <div className=' align-middle'>
                        <label className=' mr-5  font-bold' htmlFor="busqueda">Inserta titulo de pelicula</label><br />
                        <input required id="busqueda" className='bg-gray-100 my-2 w-full sm:w-2/3 lg:w-1/2 ' type="text" placeholder='Introduce tu busqueda' value={busqueda} onChange={e => setBusqueda(e.target.value)} /><br />
                        <input className='py-3 mt-5 rounded-lg bg-blue-700 w-full  sm:w-2/3 lg:w-1/2  text-white font-bold hover:bg-blue-500' type="submit" value="Buscar" />
                    </div>

                </form>
                <div className='lg:ml-20'>
                    {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                </div>

            </div>
            {(cargado != true) ? <Spinner /> : salida}





        </>

    )
}

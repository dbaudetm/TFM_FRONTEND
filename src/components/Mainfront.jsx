import React from 'react'
import Header from './Header'
import useLogin from '../hooks/useLogin'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Cards2 } from './Cards2'
const Mainfront = () => {
    const [peliculas, setPeliculas] = useState([])
    const [cargado, setCargado] = useState(true)
    const valor = 8
    const inicio = 0;
    var materials = [
        'Hydrogen',
        'Helium',
        'Lithium',
        'Beryllium'
    ];
    useEffect(() => {

        const getUpcoming = async () => {


            const res = await axios.post("https://api.themoviedb.org/3/movie/upcoming?api_key=f6cd88838ddcb3b1de31cd6978dc3282&language=en-US&page=1")
            if (res.data.results.lenght > 0 || res.data.result != undefined) {

                setPeliculas(res.data.results)



            } else {

                const res = await axios.post("https://api.themoviedb.org/3/movie/popular?api_key=f6cd88838ddcb3b1de31cd6978dc3282&language=en-US&page=1")

                setPeliculas(res.data.results)


            }



        }




        setCargado(false)
        getUpcoming()
        setCargado(true)






    }, [])
    console.log("peliculas")
    console.log(peliculas)

    const salida = (

        <>
            <Header />
            <div className=''>

                <div className=' grid grid-cols-1 p-2 rounded-3xl mx-auto h-full h-screen'>
                    <h1 className='mx-auto w-full text-center text-2xl font-bold bg-white rounded-t-lg'>Estrenos</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-b-xl overflow-visible'>
                        {(cargado && peliculas) && peliculas.map((pelicula, index) => {

                            if (index < 4) {
                                return <Cards2 key={pelicula.id} peliculaEntrada={pelicula} />
                            }


                        })}




                    </div>
                </div>





            </div>


        </>

    )



    return (
        <>
            {(peliculas.length != 0) ? salida : <>
                <Header />
                <div className=''>

                    <div className=' grid grid-cols-1 p-2 rounded-3xl mx-auto '>
                        <h1 className='mx-auto w-full text-center text-2xl font-bold rounded-t-lg'>Estrenos</h1>
                        <p className='text-red-600 text-center mx-auto font-bold text-2xl'>No se ha podido cargar los estrenos</p>
                    </div>





                </div>

            </>}
            <p className='p-3 ml-1 text-bold '>Baudet Moreno David TFM 2022</p>
        </>


    )
}

export default Mainfront
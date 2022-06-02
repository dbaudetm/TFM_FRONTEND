import React, { useState } from 'react'

import { Link, useNavigate, Navigate } from 'react-router-dom'
export const Cards = ({ peliculaEntrada }) => {

    const [image, setImage] = useState('hola')
    const [busqueda, setBusqueda] = useState('')
    var img = ''

    if (peliculaEntrada.posterPelicula == null) {


        img = 'https://www.digi.com.py/images/image-not-found.png'
    } else {

        img = "https://image.tmdb.org/t/p/w500/" + peliculaEntrada.posterPelicula

    }

    const navigate = useNavigate();

    const id = peliculaEntrada._id

    const toComponentB = () => {
        navigate('film', { peliculaEntrada })
    }



    return (






        <>
            <div className='rounded-lg p-3 bg-white mt-3 m-3' >


                <Link to={`film/${id}`} query={{ pelicula: peliculaEntrada }}><img className='mx-auto' src={img} alt="" /></Link>
                <Link to={`film/${id}`} query={{ pelicula: peliculaEntrada }}><h1 className='col-end-1 text-center m-2 font-bold'>{peliculaEntrada.tituloPelicula}</h1></Link>


            </div>
        </>
    )
}

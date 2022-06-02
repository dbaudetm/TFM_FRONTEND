import React, { useState } from 'react'

import { Link, useNavigate, Navigate } from 'react-router-dom'
export const Cards2 = ({ peliculaEntrada }) => {

    const [image, setImage] = useState('hola')
    const [busqueda, setBusqueda] = useState('')
    var img = ''

    if (peliculaEntrada.poster_path == null) {


        img = 'https://www.digi.com.py/images/image-not-found.png'
    } else {

        img = "https://image.tmdb.org/t/p/w500/" + peliculaEntrada.poster_path

    }

    const navigate = useNavigate();

    const id = peliculaEntrada._id

    const toComponentB = () => {
        navigate('film', { peliculaEntrada })
    }



    return (






        <>
            <div className='rounded-lg p-1 bg-white mt-1 m-1' >


                <img className='mx-auto rounded-lg' src={img} alt="" />
                <h1 className='col-end-1 text-center m-1 font-bold'>{peliculaEntrada.original_title}</h1>


            </div>
        </>
    )
}

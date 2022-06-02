import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const Coment2 = (props) => {

    const { authLogin } = useLogin()
    console.log("Props del comentario")
    console.log(props)

    const estrellas = props.comentario.valoracionComentario
    const vacias = (5 - estrellas)
    const stars = []


    for (var i = 0; i < estrellas; i++) {
        stars.push(<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)

    }
    for (var i = 0; i < vacias; i++) {
        stars.push(<svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)

    }


    if (props.id) {


        return (


            <div className='p-2 rounded-xl bg-gray-200 mb-2 '>
                <div className='grid grid-cols-2' >
                    <h1 className='font-bold mb-2'>{props.comentario.autorNombre}</h1>
                    <div class="flex items-center">
                        {stars}
                    </div>
                </div >
                <Link className='font-bold mb-3 text-blue-600 hover:text-yellow-500' to={`../film/${props.comentario.Pelicula}`}>{props.comentario.nombrePelicula}</Link><br />
                <p className='mb-2'>{props.comentario.textoComentario}</p>
                <Link className='font-bold mb-3 text-blue-600 hover:text-yellow-500' to={`../film/${props.comentario.Pelicula}`}>Edita este comentario</Link>
            </div >
        )




    } else {

        return (


            <div className='p-2 rounded-xl bg-gray-200 mb-2 '>
                <div className='grid grid-cols-2 ' >
                    <h1 className='font-bold'>{props.comentario.autorNombre}</h1>
                    <div class="flex items-center">
                        {stars}
                    </div>
                </div>
                <Link className='font-bold mb-3 text-blue-600 hover:text-yellow-500' to={`../film/${props.comentario.Pelicula}`}>{props.comentario.nombrePelicula}</Link>
                <p>{props.comentario.textoComentario}</p>



            </div>
        )


    }



}

export default Coment2
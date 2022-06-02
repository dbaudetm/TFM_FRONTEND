import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header2 from './Header2'
import axios from 'axios'
import { useEffect } from 'react'
const ConfirmCount = () => {


    const datosEntrada = useParams()
    const { id } = datosEntrada
    useEffect(() => {
        const confirm = async () => {
            console.log("este es el id que entra", id)
            try {
                const res = await axios.get(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/confirm/${id}`)
                console.log(res.data)
            } catch (error) {
                console.log(error.data)
            }
        }
        confirm()
    }, [])


    return (
        <>
            <Header2 />
            <div className='mt-8 md:mt-30 p-10 '>
                <div className='bg-inherit container mx-auto md:flex md:justify-center'>
                    <div className='md:w-2/3 lg:w-1/2'>
                        <h1 className='container  md:w-2/3 lg:w-1/2 text-5xl text-blue-700 font-bold pb-5 mx-auto md:flex md:justify-left'>Evaluate<br />Films</h1>
                        <div className='bg-white p-10 shadow-lg rounded-md' >
                            <p className=' mr-5  font-bold'>Su cuenta esta confirmada.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmCount
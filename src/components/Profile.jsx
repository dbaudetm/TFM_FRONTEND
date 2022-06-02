import React from 'react'
import useLogin from '../hooks/useLogin'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Message from './Message'

const Profile = () => {

    const { authLogin, setAuthLogin, deleteAuthLogin } = useLogin()
    const [nombre, setNombre] = useState(authLogin.nombreUsuario)
    const [correo, setCorreo] = useState(authLogin.emailUsuario)
    const [contraseña, setContraseña] = useState('')
    const [contraseñaNueva, setContraseñaNueva] = useState('')
    const [ocultarBorrado, setOcultarBorrado] = useState(false)
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)
    const logout = async () => {
        await localStorage.removeItem('token')
        await localStorage.removeItem('tokenAccess')
        deleteAuthLogin()
        navigate("/public/Login")
    }

    const cambiarOcultarBorrado = () => {

        if (ocultarBorrado) {


            setOcultarBorrado(false)


        } else {


            setOcultarBorrado(true)

        }





    }

    const borrado = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {

            const tokenAccess = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }

            };



            if (contraseña.trim() == "") {
                setMensaje("Introduce la contraseña")
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return
            }

            const datos = {
                id: authLogin._id,
                nombre: nombre,
                correo: correo,
                con: contraseña

            }



            const respuesta = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/deleteUser`, datos, config)


            if (respuesta.data.mesage == "Se ha borrado") {
                setMensaje("Se ha borrado al usuario")
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                logout()
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

    const actualizar = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {


            const tokenAccess = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }

            };


            if (nombre.trim() == "" || correo.trim() == "" || contraseña.trim() == "") {


                setMensaje("Introduce valores")
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);


            }




            const datos = {

                id: authLogin._id,
                nombre: nombre,
                correo: correo,
                con: contraseña,
                connueva: contraseñaNueva

            }

            const respuesta = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/updateUser`, datos, config)

            console.log(respuesta.data.error)

            if (respuesta.data.error != undefined) {

                setMensaje(respuesta.data.error)
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return




            }


            if (respuesta.data.mesage != undefined) {

                setMensaje(respuesta.data.mesage)
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                logout()


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






    return (
        <div className='bg-white rounded-2xl  lg:m-10'>
            <h1 className=' font-bold text-4xl m-3 text-blue-600 pb-2 pt-4'>Perfil</h1>

            <form className="grid grid-cols-1 m-3" onSubmit={actualizar}>

                <label className="text-blue-600 font-bold" htmlFor="">Nombre Usuario:</label>
                <input className='bg-gray-100 my-2 w-full ' required value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" />
                <label className="text-blue-600 font-bold" htmlFor="" >Correo:</label>
                <input className='bg-gray-100 my-2 w-full' required value={correo} type="email" name="" id="" onChange={(e) => setCorreo(e.target.value)} />
                <label className="text-blue-600 font-bold" htmlFor="">Contraseña Antigua</label>
                <input className='bg-gray-100 my-2 w-full' required value={contraseña} type="password" onChange={(e) => setContraseña(e.target.value)} />
                <label className="text-blue-600 font-bold" htmlFor="">Contraseña Nueva</label>
                <input className='bg-gray-100 my-2 w-full' value={contraseñaNueva} type="password" onChange={(e) => setContraseñaNueva(e.target.value)} />
                <button className='p-2 bg-blue-600 w-1/2 rounded-2xl text-white m-2'>Guardar</button>

            </form>


            {ocultarBorrado == false && <button className='p-2 bg-red-700 w-1/2 rounded-2xl text-white m-2' onClick={cambiarOcultarBorrado}>Eliminar Cuenta</button>

            }
            {ocultarBorrado && <form className="grid grid-cols-1 m-3" onSubmit={borrado}>

                <label className="text-blue-600 font-bold" htmlFor="">Escribe tu contraseña para borrar la cuenta:</label>
                <input className='bg-gray-100 my-2 w-full' value={contraseña} type="password" onChange={(e) => setContraseña(e.target.value)} />
                <div className='grid grid-cols-2 '>
                    <button className='p-2 bg-red-600 w-1/2 rounded-2xl text-white m-2'>Eliminar</button>
                    <button className='p-2 bg-blue-700 w-1/2 rounded-2xl text-white m-2' onClick={cambiarOcultarBorrado}>Cancelar</button>
                </div>


            </form>}
            {mensaje && <Message mensaje={mensaje} alerta={alerta} />}




        </div>
    )
}

export default Profile
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header2 from './Header2'
import Message from './Message'
const RecoverPassword = () => {

    const tokenEntrada = useParams()
    const { token } = tokenEntrada
    const [confirmado, setConfirmado] = useState(false)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)

    useEffect(() => {

        const compruebaToken = async () => {

            try {


                const data = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/confirm2/${token}`)
                if (data.data.mesage == "Usuario confirmado") {

                    setConfirmado(true)


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

        compruebaToken()



    }, [])


    const envioContraseñaNueva = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {

            if (confirmado) {


                if (password == password2) {

                    const passwordUsuario = {

                        pass: password

                    }

                    const data = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/password/${token}`, passwordUsuario)
                    if (data.data.mesage != undefined) {

                        setConfirmado(false)
                        setMensaje("Se ha cambiado tu contraseña")
                        setAlerta(false)
                        setTimeout(() => {
                            setMensaje("")
                            setAlerta(false)
                        }, 3000);

                    }


                } else {



                    setMensaje("Las contraseñas no coinciden")
                    setAlerta(true)
                    setTimeout(() => {
                        setMensaje("")
                        setAlerta(false)
                    }, 3000);





                }






            } else {
                setMensaje("Cuenta de correo no confirmada")
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




    return (
        <>
            <Header2 />
            <div className='mt-8 md:mt-30 p-10 '>
                <div className='bg-inherit container mx-auto md:flex md:justify-center'>
                    <div className='md:w-2/3 lg:w-1/2'>
                        <h1 className='container  md:w-2/3 lg:w-1/2 text-5xl text-blue-700 font-bold pb-5 mx-auto md:flex md:justify-left'>Evaluate<br />Films</h1>

                        <form onSubmit={envioContraseñaNueva} className='bg-white p-10 shadow-lg rounded-md'>

                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="email">PASSWORD</label><br />
                                <input id="email" className='bg-gray-100 my-2 w-full' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Introduce tu contraseña' />
                            </div>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="password">REPITE LA PASSWORD</label><br />
                                <input id="password" className='bg-gray-100 my-2 w-full' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder='Introduce tu contraseña' />
                                <input className='py-3 mt-5 rounded-lg bg-blue-700 w-full text-white font-bold hover:bg-blue-500' type="submit" value="GUARDAR CONTRASEÑA" />
                            </div>
                        </form>
                        {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                    </div>
                </div>
            </div>
        </>
    )
}

export default RecoverPassword
import React from 'react'
import Header2 from './Header2'
import { useState } from 'react'
import axios from 'axios'
import Message from './Message'


const Register = () => {
    const [nombreUsuario, setNombreUsuario] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [passwordUsuario, setPasswordUsuario] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)

    const handleSubmit = async (e) => {

        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()



        if (nombreUsuario.trim() == "" || passwordUsuario.trim() == "" || emailUsuario.trim() == "") {

            setAlerta(true)
            setMensaje("Rellana todos los campos")
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);

            return
        }

        if (passwordUsuario.trim() != repeatPassword.trim()) {

            setAlerta(true)
            setMensaje("Las contraseñas son distintas")
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);

            return


        }







        const body = { nombreUsuario, passwordUsuario, emailUsuario }
        console.log(body)
        try {
            const res = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/register`, { nombreUsuario, passwordUsuario, emailUsuario })
            console.log(res.data)

            if (res.data.error != undefined) {

                setAlerta(true)
                setMensaje(res.data.error)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);

                return
            }

            setAlerta(false)
            setMensaje(res.data.mesage)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 5000);





            setNombreUsuario('')
            setPasswordUsuario('')
            setRepeatPassword('')
            setEmailUsuario('')

        } catch (error) {
            console.log(error.data)
        }

    }

    return (
        <>
            <Header2 />
            <div className='mt-8 md:mt-30 p-10 '>
                <div className='bg-inherit container mx-auto md:flex md:justify-center'>
                    <div className='md:w-2/3 lg:w-1/2'>
                        <h1 className='container  md:w-2/3 lg:w-1/2 text-5xl text-blue-700 font-bold pb-5 mx-auto md:flex md:justify-left'>Evaluate<br />Films</h1>
                        <form onSubmit={handleSubmit} className='bg-white p-10 shadow-lg rounded-md'>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="nombreUsuario">NOMBRE USUARIO</label><br />
                                <input id="nombreUsuario" className='bg-gray-100 my-2 w-full' type="text" placeholder='Introduce tu email' value={nombreUsuario} onChange={i => setNombreUsuario(i.target.value)} />
                            </div>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="emailUsuario">EMAIL</label><br />
                                <input id="emailUsuario" className='bg-gray-100 my-2 w-full' type="email" placeholder='Introduce tu email' value={emailUsuario} onChange={i => setEmailUsuario(i.target.value)} />
                            </div>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="passwordUsuario">PASSWORD</label><br />
                                <input id="passwordUsuario" className='bg-gray-100 my-2 w-full' type="password" placeholder='Introduce tu contraseña' value={passwordUsuario} onChange={i => setPasswordUsuario(i.target.value)} />
                            </div>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="password2">REPITE EL PASSWORD</label><br />
                                <input id="password2" className='bg-gray-100 my-2 w-full' type="password" placeholder='Repite tu contraseña' value={repeatPassword} onChange={i => setRepeatPassword(i.target.value)} />
                                <input className='py-3 mt-5 rounded-lg bg-blue-700 w-full text-white font-bold hover:bg-blue-500' type="submit" value="REGISTRARSE" />
                            </div>

                        </form>
                        {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
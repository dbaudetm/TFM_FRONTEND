import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Header2 from './Header2'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useLogin from '../hooks/useLogin'
import Spinner from './Spinner'
import Message from './Message'



const Login = () => {

    const [emailUsuario, setEmailUsuario] = useState('')
    const [passwordUsuario, setPasswordUsuario] = useState('')
    const { setAuthLogin, authLogin, load, setLoad, getToken2 } = useLogin()
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)






    const handleSubmit = async (e) => {
        e.preventDefault()
        try {


            if (emailUsuario.trim() == "" || passwordUsuario.trim() == "") {

                setMensaje("Rellena todos los campos")
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return


            }

            const res = await axios.post(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/login/`, { emailUsuario, passwordUsuario })

            if (res.data.token == undefined) {

                setMensaje(res.data.error)
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return

            }


            localStorage.setItem('token', res.data.token)
            getToken2()
            setMensaje("Se ha validado el login")
            window.location.reload(false);
            setAlerta(false)



        } catch (error) {
            setMensaje(error.data)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);

        }

        console.log("Antes de comparar")
        console.log(authLogin)
        console.log(load)

        if (!load) {

            if (authLogin._id) {
                console.log("Entra en el sitio que deve")
                return <HomeUsuario />
            } else {
                console.log("No entra en el sitio que deve")
                navigate('/')
            }
        } else { handleSubmit }
    }

    return (
        <>
            <Header2 />
            <div className='mt-8 md:mt-30 p-10 '>
                <div className='bg-inherit container mx-auto md:flex md:justify-center'>
                    <div className='md:w-2/3 lg:w-1/2'>
                        <h1 className='container  md:w-2/3 lg:w-1/2 text-5xl text-blue-700 font-bold pb-5 mx-auto md:flex md:justify-left'>Evaluate<br />Films</h1>
                        <form className='bg-white p-10 shadow-lg rounded-md' onSubmit={handleSubmit}>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="email">EMAIL</label><br />
                                <input id="email" className='bg-gray-100 my-2 w-full' type="email" placeholder='Introduce tu email' value={emailUsuario} onChange={e => setEmailUsuario(e.target.value)} />
                            </div>
                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="password">PASSWORD</label><br />
                                <input id="password" className='bg-gray-100 my-2 w-full' type="password" placeholder='Introduce tu contraseña' value={passwordUsuario} onChange={e => setPasswordUsuario(e.target.value)} />
                                <input className='py-3 mt-5 rounded-lg bg-blue-700 w-full text-white font-bold hover:bg-blue-500' type="submit" value="INICIAR SESION" />
                            </div>
                        </form>

                        <nav className='lg:flex lg:justify-between mt-2'>
                            <Link className='text-blue-700 font-bold' to={"/public/forgetPassword"}>Olvidaste la contraseña</Link>
                        </nav>
                        {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                    </div>

                </div>

            </div>

        </>
    )
}

export default Login
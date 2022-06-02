import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Header2 from './Header2'
import Message from './Message'
const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)

    const contraseñaOlvidada = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {

            console.log(email)
            const datos = {

                email: email

            }

            const data = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/recovery`, datos)

            if (data.data.mesage != undefined) {

                setMensaje(data.data.mesage)
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);

                return

            }


            if (data.data.error != undefined) {

                setMensaje(data.data.error)
                setAlerta(true)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);

                return

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

                        <form onSubmit={contraseñaOlvidada} className='bg-white p-10 shadow-lg rounded-md'>

                            <div className='m-5'>
                                <label className=' mr-5  font-bold' htmlFor="email">EMAIL DE RECUPERACIÓN</label><br />
                                <input id="email" className='bg-gray-100 my-2 w-full' type="email" placeholder='Email para recuperación' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input className='py-3 mt-5 rounded-lg bg-blue-700 w-full text-white font-bold hover:bg-blue-500' type="submit" value="RECUPERAR CONTRASEÑA" />

                            </div>


                        </form>
                        {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgetPassword
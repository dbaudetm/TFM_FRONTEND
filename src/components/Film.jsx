import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Spinner from './Spinner'
import Coment from './Coment'
import useLogin from '../hooks/useLogin'
import Message from './Message'
const Film = (props) => {

    const { authLogin } = useLogin()
    const datosEntrada = useParams()
    const { id } = datosEntrada
    const [datos, setDatos] = useState({})
    const [cargado, setCargado] = useState(true)
    const [seguimiento, setSeguimiento] = useState("0")
    const [comentarios, setComentarios] = useState([])
    const [comentario, setComentario] = useState({})
    const [editar, setEditar] = useState(false)
    const [nota, setNota] = useState("0")
    const [textoComentario, setTextoComentario] = useState("")
    const [ocultar, setOcultar] = useState("false")
    const [usuario, setUsuario] = useState({})
    const [mensaje, setMensaje] = useState("")
    const [alerta, setAlerta] = useState(false)



    useEffect(() => {
        async function cargaDatos() {

            setCargado(true)
            const Pelicula = "626f3e5a2f1f7501d2a112e6";
            const tokenAccess = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                },
                params: {
                    "Pelicula": id,
                }

            };
            const { data } = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/verPelicula/${id}`, config)
            const usuario = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/user`, config)
            const comentariosData = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/searchComentByFilm`, config)
            const comentariosTotales = comentariosData.data

            const usuarioData = usuario.data
            setUsuario(usuarioData)
            const comentarioUsuario = comentariosTotales.filter(coment => coment.autorComentario.valueOf() === usuarioData._id)
            setComentario(comentarioUsuario[0])
            setComentarios(comentariosTotales.filter(coment => coment.autorComentario.valueOf() !== usuarioData._id))



            await setDatos(data[0])


            if (usuarioData.arraySeguimiento.find(element => element.id == id) != undefined) {

                setSeguimiento("1")
                document.getElementById("mySelect").value = "1"


            } else if (usuarioData.arrayVistas.find(element => element.id == id) != undefined) {

                setSeguimiento("2")
                document.getElementById("mySelect").value = "2"

            } else {
                setSeguimiento("0")
                document.getElementById("mySelect").value = "0"


            }



            setCargado(false)


        }



        cargaDatos()

        setCargado(false)




    }, [seguimiento])







    async function cambioSeguimiento(e) {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {

            const tokenAccess = localStorage.getItem('token')

            if (e.target.value == "1") {
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenAccess}`
                    }

                };
                await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/addFollow/${id}`, config)

                await setSeguimiento("1")
                document.getElementById("mySelect").value = "1"
                return

            } else if (e.target.value == "2") {

                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenAccess}`
                    }

                };
                await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/addViews/${id}`, config)
                await setSeguimiento("2")
                document.getElementById("mySelect").value = "2"
                return



            } else if (e.target.value == "0") {

                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenAccess}`
                    }

                };
                await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/NotViewFollow/${id}`, config)
                await setSeguimiento("0")
                document.getElementById("mySelect").value = "0"
                return







            }





        } catch (error) {
            console.log(error)
        }




    }


    function activarEditar() {

        if (editar) {

            setEditar(false)
            setOcultar(true)


        } else {

            setEditar(true)
            setOcultar(false)
            setTextoComentario(comentario.textoComentario)
            setNota(comentario.valoracionComentario.toString())


        }

    }


    const updateDeleteCreate = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()
        try {


            if (textoComentario == "") {

                setMensaje("Rellena todos los campos")
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return
            }



            activarEditar()
            const tokenAccess = localStorage.getItem('token')
            const contenedor = comentario
            contenedor.textoComentario = textoComentario





            contenedor.valoracionComentario = parseInt(nota)
            setComentario(contenedor)


            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }
            };
            const salida = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/updateComent/`, comentario, config)

            if (salida.data.error == undefined) {


                setMensaje("Se ha actualizado el comentario")
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);






            } else {



                setMensaje("No se ha actualizado el comentario")
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);




            }
        } catch (error) {
            setMensaje(error)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);
        }

    }

    const deleteComent = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()

        try {
            setMensaje("")
            setAlerta(false)
            if (window.confirm("¿Estás seguro de querer eliminar el comentario?")) {
                const tokenAccess = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${tokenAccess}`
                    }
                };
                const salida = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/deleteComent/`, comentario, config)

                if (salida.data.error == undefined) {

                    setComentario(undefined)
                    setNota("")
                    setTextoComentario("")
                    setMensaje("Se ha borrado el comentario")
                    setAlerta(false)
                    setTimeout(() => {
                        setMensaje("")
                        setAlerta(false)
                    }, 3000);
                    return

                }


            }

        } catch (error) {
            setMensaje(error)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);
        }








    }

    const createComent = async (e) => {
        if (e && "preventDefault" in e) e.preventDefault()
        e.preventDefault()
        try {

            const valores = {

                autorComentario: authLogin._id,
                valoracionComentario: nota,
                textoComentario: textoComentario,
                Pelicula: id,
                nombrePelicula: datos.tituloOriginalPelicula,
                autorNombre: authLogin.nombreUsuario





            }
            setComentario(valores)
            const tokenAccess = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }
            };
            const salida = await axios.post(`${import.meta.env.VITE_backendUrl}/api/usuarios/createComent/`, valores, config)
            console.log(salida.data)
            console.log(salida.data.error == undefined)
            if (salida.data.error == undefined) {

                setMensaje("Se ha creado el comentario")
                setAlerta(false)
                setTimeout(() => {
                    setMensaje("")
                    setAlerta(false)
                }, 3000);
                return

            }



            setMensaje(salida.data.error)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);

            return




        } catch (error) {
            setMensaje(error)
            setAlerta(true)
            setTimeout(() => {
                setMensaje("")
                setAlerta(false)
            }, 3000);
        }




    }






    const salida = (

        <div className=' bg-white rounded-2xl p-2 lg:m-32' >



            <h1 className='text-center font-bold text-4xl pt-4'>{datos.tituloPelicula} </h1>
            <img className='mx-auto m-4 md:w-2/3  lg:w-1/3' src={"https://image.tmdb.org/t/p/w500/" + datos.posterPelicula} alt={"imagen de la pelicula " + datos.tituloOriginalPelicula} />
            <select id="mySelect" value={seguimiento.value} onChange={cambioSeguimiento} class="form-select appearance-none border-4
      block
        ml-4
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      mb-10
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option value="0" selected>Opciones</option>
                <option value="1">Seguir</option>
                <option value="2">Vista</option>
            </select>

            <div className='bg-gray-100 rounded-xl p-8'>
                <h3 className='font-bold text-2xl mb-2'>Título original: <span className='font-normal text-xl mb-2'>{datos.tituloOriginalPelicula}</span> </h3>
                <h3 className='font-bold text-2xl mb-2'>Fecha Lanzamiento: <span className='font-normal text-xl mb-2'>{datos.fechaPelicula}</span> </h3>
                <h2 className='font-bold text-2xl mb-2'>Sinopsis:</h2>
                <p className='text-justify'>{datos.sinopsisPelicula}</p>
                <div className='grid grid-cols-2 mx-auto p-2'>
                    <div>
                        <h2 className='font-bold text-2xl mb-2'>Genero:</h2>

                        <ul>

                            {datos.generosPelicula && datos.generosPelicula.map(genero => {

                                return <li key={genero} className=''>{genero}</li>

                            })}

                        </ul>
                    </div>
                    <div>

                        <h2 className='font-bold text-2xl mb-2'>Idiomas:</h2>
                        <ul >

                            {datos.idiomasPelicula && datos.idiomasPelicula.map(idiomas => {

                                return <li key={idiomas} className=''>{idiomas}</li>

                            })}

                        </ul>
                    </div>


                </div>

                <h2 className='font-bold text-2xl mb-4 mx-auto'>Mi comentario:</h2>

                {(comentario && ocultar) && <>
                    <div className='w-full md:w-2/3 lg:w-2/3'>
                        <Coment comentario={comentario} size={"xl"} />
                        <div className='grid grid-cols-2 pb-2 w-2/3  gap-1'>
                            <button className='bg-blue-500 rounded-xl w-full text-white font-bold ' onClick={activarEditar}>Editar</button>
                            <button className='bg-red-500 rounded-xl w-full text-white font-bold ' onClick={deleteComent}>Eliminar</button>
                        </div>

                    </div>

                </>
                }

                {comentario == undefined &&

                    <div>


                        <form onSubmit={createComent} className=' lg:w-2/3' >
                            <div className='bg-gray-300 p-2 m-2 rounded-lg'>
                                <textarea placeholder="Introduce tu comentario" required className='transition
ease-in-out mx-auto m-2 w-full read-only: resize-none h-20 p-2 rounded-xl mb-2' type="text" value={textoComentario} onChange={i => setTextoComentario(i.target.value)} /><br />
                                <div className='grid grid-cols-2 w-2/3 gap-6'>
                                    <label className='p-2' htmlFor="">Vota:</label>
                                    <select className='w-2/3' required name="" id="" value={nota} onChange={i => setNota(i.target.value)}>
                                        <option value="0" selected>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>

                            </div>

                            <button type="submit" className='bg-blue-500 p-1 text-white font-bold rounded-xl '  >Agregar comentario</button>


                        </form>


                    </div>




                }



                {editar && <>
                    <div>


                        <form className=' lg:w-1/3' >
                            <div className='bg-gray-300 p-2 m-2 rounded-lg'>
                                <textarea required className='transition
        ease-in-out mx-auto m-2 w-full read-only: resize-none h-20 p-2 rounded-xl mb-2' type="text" value={textoComentario} onChange={i => setTextoComentario(i.target.value)} /><br />
                                <div className='grid grid-cols-2 w-2/3 gap-6'>
                                    <label className='p-2' htmlFor="">Vota:</label>
                                    <select className='w-2/3' required name="" id="" value={nota} onChange={i => setNota(i.target.value)}>
                                        <option value="0" selected>0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 p-2'>
                                <input type="submit" value="Actualizar" className='bg-blue-500 text-white font-bold rounded-xl w-1/3' onClick={updateDeleteCreate} />
                                <button className='bg-red-500 rounded-xl text-white font-bold w-2/3' onClick={activarEditar}>Cancelar</button>
                            </div>

                        </form>


                    </div>


                </>}
                {mensaje && <Message mensaje={mensaje} alerta={alerta} />}

                <h3 className='font-bold text-2xl mb-4 mx-auto'>Otros Comentarios:</h3>
                <div className='overflow-y-auto h-32  '>






                    {comentarios.length > 0 && comentarios.map(comentario => {


                        return <Coment key={comentario.tituloPelicula} comentario={comentario} size={"l"} />


                    })}


                </div>
            </div>




        </div>

    )


    if (cargado == true) return <Spinner />

    return (
        <>
            {cargado != false && datos ? <Spinner /> : salida}

        </>

    )
}

export default Film
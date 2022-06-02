import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner'
import Coment2 from './Coment2'
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
function BarChar(props) {
    // set data
    const [barData, setBarData] = useState({
        labels: ['Votadas', 'Medía', 'Seguidas ', 'Vistas'],
        datasets: [
            {
                label: ["Analisis de películas"],
                data: [
                    props.numero, props.media, props.numeroSeguimiento, props.numeroVistas
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', 'rgb(60, 179, 113)', 'rgb(255, 165, 0)', 'rgb(106, 90, 205)'
                ],
                borderWidth: 3
            }
        ]
    });

    console.log(barData.datasets.data, props.media)


    // set options
    const [barOptions, setBarOptions] = useState({
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Datos de usuario',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    });

    // return JSX
    return (
        <div className="BarExample">
            <Bar
                data={barData}
                options={barOptions} />
        </div>
    );
}
const MyVotes2 = () => {
    const ini = []
    const { authLogin } = useLogin()
    const [cargado, setCargado] = useState(true)
    const [comentarios, setComentarios] = useState([])
    const datosEntrada = useParams()
    const { id } = datosEntrada
    const { state } = useLocation();
    console.log("comentarios")
    console.log(comentarios)
    const idVisita = authLogin._id.valueOf()

    const [media, setMedia] = useState(0)
    const [numero, setNumero] = useState(0)
    const [numeroSeguimiento, setNumeroSeguimiento] = useState(0)
    const [numeroVistas, setNumeroVistas] = useState(0)



    useEffect(() => {
        setCargado(true)

        setComentarios([])
        async function cargaDatos() {

            const tokenAccess = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }

            };

            const usuario = {


                id: id

            }




            const datos = await axios.post(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/searchComentByUser`, usuario, config)
            console.log("datos iguales")
            console.log(datos)
            setComentarios(datos.data)
            const array = datos.data
            const usuario2 = {

                id: datosEntrada.id

            }
            const datos2 = await axios.post(`https://tfmevaluatefilm.herokuapp.com/api/usuarios/userData`, usuario2, config)
            console.log("respuesta")
            console.log(datos2.data)
            if (datos2.data != undefined) {

                const arraySeguimiento = datos2.data.arraySeguimiento
                const arrayVistas = datos2.data.arrayVistas
                setNumeroSeguimiento(arraySeguimiento.length)
                setNumeroVistas(arrayVistas.length)

            }

            setNumero(array.length)
            setMedia(array.map(item => item.valoracionComentario).reduce((prev, curr) => (prev + curr), 0) / array.length)
            console.log("media", media)
            console.log(datos)
            setComentarios(datos.data)









        }




        cargaDatos()
        setCargado(false)



    }, [])



    const salida =


        (





            <div className='bg-white p-5  sm:p-2 shadow-lg rounded-md'>
                <div className=' '>
                    {(!cargado && media != 0) && <><BarChar media={media} numero={numero} numeroSeguimiento={numeroSeguimiento} numeroVistas={numeroVistas} /> {console.log("cargada", media)}</>}
                </div>

                <h1 className='text-3xl font-bold text-black mb-3'>Votaciones de <span className='text-3xl font-bold text-blue-600'>{state.nombre}</span></h1>
                <div className='overflow-auto h-40 '>
                    {(comentarios.length > 0) && comentarios.map(comentario => {

                        return <Coment2 key={comentario._id} id={false} comentario={comentario} />

                    })}



                </div>



            </div>


        )

    if (cargado == true) return <Spinner />

    return (
        <>

            {cargado != false && comentarios ? <Spinner /> : salida}

        </>


    )
}

export default MyVotes2
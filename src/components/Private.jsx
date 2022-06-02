
import { Navigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import HomeUsuario from './HomeUsuario'
import Spinner from './Spinner'
const Private = () => {


    const { authLogin } = useLogin()
    const { load } = useLogin()



    const check = () => {



        if (authLogin._id) {

            return <HomeUsuario />

        } else {

            return <Navigate to="/" />
        }







    }


    if (load) return <Spinner />


    return (
        <>
            {check()}
        </>

    )







}

export default Private
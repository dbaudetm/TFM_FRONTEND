import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [authLogin, setAuthLogin] = useState({})
    const [load, setLoad] = useState(true)
    const navigate = useNavigate()
    const [busquedaGuardada, setBusquedaGuardada] = useState([])


    const getToken2 = async () => {
        setLoad(true)
        const token = localStorage.getItem('token')
        console.log("Antes", token)
        if (token != "" && token != undefined && token != null) {
            console.log("Existo", token)
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const res = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/profile`, config)
                console.log(res.data)
                if (res.data != undefined) {
                    await localStorage.setItem('tokenAccess', res.data)
                    setAuthLogin(res.data)

                }



            } catch (error) {
                console.log(error)
            }
        }

        setLoad(false)
    }


    useEffect(() => {
        const getToken = async () => {
            const token = localStorage.getItem('token')
            console.log("Antes", token)
            if (token != "" && token != undefined && token != null) {
                console.log("Existo", token)
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const res = await axios.get(`${import.meta.env.VITE_backendUrl}/api/usuarios/profile`, config)
                    console.log(res.data)
                    await localStorage.setItem('tokenAccess', res.data)
                    await setAuthLogin(res.data)
                    await navigate('/private')

                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("No existo", token)
                setLoad(false)
                return

            }
            console.log("Cambiando")
            setLoad(false)
        }
        getToken()
        setLoad(false)

    }, [])

    const deleteAuthLogin = () => {


        setAuthLogin({})


    }

    return (
        <AuthContext.Provider value={{
            load,
            authLogin,
            setAuthLogin,
            busquedaGuardada,
            setBusquedaGuardada,
            deleteAuthLogin,
            getToken2

        }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthProvider }

export default AuthContext
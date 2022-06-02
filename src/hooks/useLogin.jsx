import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useLogin = () => {

    return useContext(AuthContext)

}

export default useLogin
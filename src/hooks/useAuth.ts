import { AuthContext } from './../contexts/AuthContex';
import { useContext } from "react";

export function useAuth(){
    const value = useContext(AuthContext)

    return value;
}
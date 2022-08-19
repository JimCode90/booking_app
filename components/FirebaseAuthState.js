import { useEffect, useContext } from "react";
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import axios from "axios";
import { Context } from "../context";
import {auth} from "../firebase";
import { axiosAuth } from "../actions/axios";
import { setCookie, destroyCookie } from "nookies";


const FirebaseAuthState = ({ children }) => {

    const { dispatch } = useContext(Context);

    useEffect(() => {
        return onIdTokenChanged(auth, async (user) => {
            if (!user){
                dispatch({
                    type: 'LOGOUT'
                })
                destroyCookie(null, "token")
                setCookie(null, "token", "", {})
            }else{
                const {token} = await user.getIdTokenResult();
                // seteamos el token en las cookies
                destroyCookie(null, "token")
                setCookie(null, "token", token, {})

                axiosAuth.post('/current-user', {}).then(resp => {
                    console.log("RES ======> ", resp)
                    dispatch({
                        type: 'LOGIN',
                        payload: resp.data
                    })
                })
            }
        })
    }, []);

    return (
        <>
            {children}
        </>
    )

}

export default FirebaseAuthState;
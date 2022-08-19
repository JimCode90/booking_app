import { useEffect, useContext } from "react";
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import axios from "axios";
import { Context } from "../context";
import {auth} from "../firebase";


const FirebaseAuthState = ({ children }) => {

    const { dispatch } = useContext(Context);

    useEffect(() => {
        return onIdTokenChanged(auth, async (user) => {
            if (!user){
                dispatch({
                    type: 'LOGOUT'
                })
            }else{
                const {token} = await user.getIdTokenResult();
                console.log(token);
                axios.post('http://localhost:8000/api/current-user', {}, {
                    headers:{
                        token: token
                    }
                }).then(resp => {
                    console.log("RES ======> ", resp)
                    // dispatch({
                    //     type: 'LOGIN',
                    //     payload: res.data
                    // })
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
import {useState} from "react";
import {useRouter} from "next/router";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import LoginRegisterForm from "../components/LoginRegisterForm";
import {toast} from 'react-toastify';
import {Button} from 'antd'
import { GoogleOutlined } from '@ant-design/icons'


const Login = () => {
    const [loginEmail, setLoginEmail] = useState('paula36@example.com');
    const [loginPass, setLoginPass] = useState('password');
    const [registroEmail, setRegistroEmail] = useState('');
    const [registroPass, setRegistroPass] = useState('');

    const router = useRouter();
    const provider = new GoogleAuthProvider();

    const registrar = async () => {
        await createUserWithEmailAndPassword(auth, registroEmail, registroPass)
            .then(user => {
                console.log('REGISTRO', user)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const login = async () => {
        await signInWithEmailAndPassword(auth, loginEmail, loginPass)
            .then(user => {
                console.log('Login', user)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const googleLogin = async () => {
        await signInWithPopup(auth, provider)
            .then(user => {
                console.log('Login', user)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    return (
        <div className="container">
            <div className="row">
                <h2 className="text-center pt-4 display-4">Login / Registro</h2>
                <Button
                    onClick={googleLogin}
                    className="mb-3 col-md-6 offset-md-3"
                    type="danger"
                    shape="round"
                    icon={<GoogleOutlined />}
                    size="large"
                >
                    Login with Google
                </Button>
            </div>

            <div className="row">
                <LoginRegisterForm
                    email={loginEmail}
                    setEmail={setLoginEmail}
                    password={loginPass}
                    setPassword={setLoginPass}
                    handleSubmit={login}
                    buttonName="Login"
                />

                <LoginRegisterForm
                    email={registroEmail}
                    setEmail={setRegistroEmail}
                    password={registroPass}
                    setPassword={setRegistroPass}
                    handleSubmit={registrar}
                    buttonName="Registro"
                />

            </div>
        </div>
    );
};

export default Login;

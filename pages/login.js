import {useState} from "react";
import {useRouter} from "next/router";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import LoginRegisterForm from "../components/LoginRegisterForm";
import {toast} from 'react-toastify';
import {Button} from 'antd'
import { GoogleOutlined, SyncOutlined } from '@ant-design/icons'
import Link from "next/link";


const Login = () => {
    const [loginEmail, setLoginEmail] = useState('paula36@example.com');
    const [loginPass, setLoginPass] = useState('password');
    const [registroEmail, setRegistroEmail] = useState('');
    const [registroPass, setRegistroPass] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const provider = new GoogleAuthProvider();

    const registrar = async () => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, registroEmail, registroPass)
            .then(user => {
                console.log('REGISTRO', user)
                router.push('/')
            })
            .catch(error => {
                toast.error(error.message)
                setLoading(false)
            })
    }

    const login = async () => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, loginEmail, loginPass)
            .then(user => {
                console.log('Login', user)
                router.push('/')
            })
            .catch(error => {
                toast.error(error.message)
                setLoading(false)
            })
    }

    const googleLogin = async () => {
        setLoading(true)
        await signInWithPopup(auth, provider)
            .then(user => {
                console.log('Login', user)
                router.push('/')
            })
            .catch(error => {
                toast.error(error.message)
                setLoading(false)
            })
    }


    return (
        <div className="container">
            <div className="row">
                <h2 className="text-center pt-4 display-4">
                    { loading ? <SyncOutlined spin className="text-danger" /> : 'Login / Registro'}
                </h2>
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
            <div className="d-flex">
                <Link href='/reset-password'>
                    <a
                        className="btn btn-outline-danger btn-sm mt-2">
                        Resetear Password
                    </a>
                </Link>

            </div>
        </div>
    );
};

export default Login;

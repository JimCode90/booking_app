import {useState, useEffect, useContext} from "react";
import {auth} from "../firebase";
import {useRouter} from "next/router";
import {Context} from "../context";
import {sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify';

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        state: {user}
    } = useContext(Context);

    let router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.passwordResetRedirect,
            handleCodeInApp: true,
        };
        await sendPasswordResetEmail(auth, email, config)
            .then((resp) => {
                setEmail('')
                setLoading(false)
                toast('Verifique su correo electrónico para el enlace de restablecimiento de contraseña')
            })
            .catch(err => {
                setLoading(false);
                toast(err.message)
            })
    }

    useEffect(() => {
        if (user !== null) {
            router.push('/')
        }
    }, [user]);


    return (
        <>
            <div className="container col-md-6 offset-md-3 p-5">
                <h2>Reset Password</h2>
                <p className="lead">Si ya se ha registrado, puede ingresar su dirección de correo electrónico para
                    recibir un enlace de restablecimiento de contraseña</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Ingrese su email"
                        autoFocus
                    />
                    <br/>
                    <button className="btn btn-primary" disabled={!email || loading}>
                        {loading ? 'Procesando' : 'Enviar'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default PasswordReset;
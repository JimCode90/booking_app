import Link from "next/link";
import {useContext} from "react";
import {Context} from "../context";
import {auth} from "../firebase";
import {useRouter} from "next/router";

const Nav = () => {
    const {
        state: {user},
        dispatch
    } = useContext(Context);

    const router = useRouter();

    console.log("USER =====> ", user)

    const handleLogout = async () => {
        console.log("cerrando sesion")
        await auth.signOut();
        dispatch({
            type: 'LOGOUT'
        });
        await router.push('/login')
    }

    return (
        <nav className="nav bg-light d-flex justify-content-between">
            <Link href="/">
                <a className="nav-link">Home</a>
            </Link>
            {
                user ? (
                    <a onClick={handleLogout} className="nav-link">Logout</a>
                ) : (
                    <Link href="/login">
                        <a className="nav-link">Login</a>
                    </Link>
                )
            }
        </nav>
    );
};

export default Nav;

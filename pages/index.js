import {Context} from "../context";
import { useContext } from "react";

const Home = () => {

    const {state} = useContext(Context);

    return (
        <div className="container">
            <h2>Home Page</h2>
            <pre>{JSON.stringify(state, null, 4)}</pre>
        </div>
    );
};

export default Home;

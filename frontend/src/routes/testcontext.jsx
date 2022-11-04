import React from "react"
import { Navigate } from "react-router-dom";
import { AuthApi } from "../controller/authapi"
import jsCookie from "js-cookie";


export default function TestContext() {
    const {auth, setAuth} = React.useContext(AuthApi);
    const readCookie = () => {
        const auth = jsCookie.get("auth");
        if (auth === "true") {
            setAuth(true);
        }
    }
    React.useEffect(() => {
        readCookie();
    }, [])
    return(
        <>
        { auth ?
        (<>
            <h1>Hello world!</h1>
            <p>You are logged in!</p>
            <button
                onClick={
                    () => {
                        jsCookie.set("auth", false);
                        setAuth(false);
                    }
                }
            >Logout</button>
        </>) : <Navigate to="/login" replace={true} />
        }
        </>
    )
}
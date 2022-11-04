import jsCookie from "js-cookie"
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthApi } from "../controller/authapi";
// export default function LoginPage() {
//     return (
//         <form onSubmit={(e) => e.preventDefault()}>
//             <label for="email">Email:</label>
//             <input className="input-text" type="text" name="email" placeholder="username@email.com" />
//             <br></br>
//             <label for="password">Password:</label>
//             <input className="input-text" type="password" name="password" placeholder="Password" />
//             <br></br>
//             <button type='submit'>Login</button>
//             <button>Register</button>
//         </form>)
// }
export default function LoginPage() {
    const {auth, setAuth} = React.useContext(AuthApi);
    React.useEffect(() => {
        const auth = jsCookie.get("auth");
        if (auth === "true") {
           setAuth(true);
        }
    }, []);
    return (
        <div>  
        { auth ? <Navigate to="/testcontext" replace={true}/>
        : ( <><h1>Click me to login!</h1>
            <p>Login page</p>
            <button onClick={
                () => {
                    jsCookie.set("auth", true, { expires: 2 });
                    setAuth(true);
                }
            }
            >Login</button></>)
        }
        </div>
    )
}
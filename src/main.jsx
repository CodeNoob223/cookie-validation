import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

//pages
import LoginPage from "./components/loginpage";
import DashBoard from "./components/dashboard";
// import ErrorPage from "./components/errorpage";

//css
import "./index.css";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashBoard />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider 
      router={myRouter}
    />
  </React.StrictMode>
);
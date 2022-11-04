import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect
} from "react-router-dom";

//context
import { AuthApi } from "./controller/authapi";
import jsCookie from "js-cookie";

//css
import "./index.css";

//pages
import Index from "./routes/index";
import Root, { loader as rootLoader, action as rootAction } from "./routes/root";
import LoginPage from "./components/loginpage";
import DashBoard from "./components/dashboard";
import ErrorPage from "./components/errorpage";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/contact";
import EditContact, { loader as editContactLoader, action as editContactAction} from "./routes/edit";
import {action as deleteContact} from "./routes/destroy";
import TestContext from "./routes/testcontext";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [{
      errorElement: <ErrorPage />,
      children: [
      { index: true, element: <Index /> },
      {
        path: "/testcontext",
        element: <TestContext />
      },
      { 
        path: "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        index: true,
        element: <Index />
      },
      {
        path: "/contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      },
      {
        path: "/contacts/:contactId/edit",
        element: <EditContact />,
        loader: editContactLoader,
        action: editContactAction
      },
      {
        path: "/contacts/:contactId/destroy",
        action: deleteContact,
        errorElement: <div>Oops! There was an error.</div>
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/dashboard",
        element: <DashBoard />
      }]
    }]
  }
]);

const App = () => {
  const [auth, setAuth] = React.useState(false);
  return(
    <AuthApi.Provider value={{auth, setAuth}}>
      <RouterProvider
          router={myRouter}
      />
    </AuthApi.Provider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
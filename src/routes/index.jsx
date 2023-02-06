import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dash";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

export const MyRoute = () => {
    return(
        <Routes>
            <Route  path="/" element={ <Login />} />
            <Route  path="/register" element={ <Register />} />
            <Route  path="/dashboard" element={ <Dashboard />} />
        </Routes>
    )
}
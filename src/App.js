import "./assets/styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/Login/Login";


export default function App() {
    return(
        <BrowserRouter>

            <Routes>

                <Route path='/' element={<LoginPage/>} />

            </Routes>

        </BrowserRouter>
    );
}
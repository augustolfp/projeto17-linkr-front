import "./assets/styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen/SignUpScreen";
import TimeLineScreen from "./components/TimeLineScreen/TimeLineScreen";
import { LoginPage } from './components/LoginScreen/LoginPage'

export default function App() {
    return(
        <BrowserRouter>

            <Routes>

                <Route path="/sign-up" element={<SignUpScreen />} />
                <Route path="/timeline" element={<TimeLineScreen />} />
                <Route path='/' element={<LoginPage/>} />

            </Routes>

        </BrowserRouter>
    );
}
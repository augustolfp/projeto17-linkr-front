import "../assets/styles/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./SignUpScreen/SignUpScreen";
import TimeLineScreen from "./TimeLineScreen/TimeLineScreen";
import SignInScreen from "./SignInScreen/SignInScreen";

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/sign-up" element={<SignUpScreen />} />
                <Route path="/timeline" element={<TimeLineScreen />} />
                <Route path="/" element={<SignInScreen />} />
            </Routes>
        </BrowserRouter>
    );
}
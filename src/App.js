import "./assets/styles/reset.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpScreen from "./components/SignUpScreen/SignUpScreen";
import TimeLineScreen from "./components/TimeLineScreen/TimeLineScreen";
import { LoginPage } from './components/LoginScreen/LoginPage'
import userDataContext from "./contexts/userDataContext";
import HashtagScreen  from "./components/HashtagScreen/HashtagScreen"

export default function App() {
    const [userData, setUserData] = useState({});

    return(
        <userDataContext.Provider value={{ userData, setUserData }}>

            <BrowserRouter>
                <Routes>
                    <Route path="/hashtag/:hashtag" element={<HashtagScreen/>} />
                    <Route path="/sign-up" element={<SignUpScreen />} />
                    <Route path="/timeline" element={<TimeLineScreen />} />
                    <Route path='/' element={<LoginPage/>} />
                </Routes>
            </BrowserRouter>
            
        </userDataContext.Provider>
    );
}
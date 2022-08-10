import { HeaderTimeLine } from "../HeaderTimeLine";
import userDataContext from "../../contexts/userDataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function TimeLineScreen() {
    const { userData, setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("tokenLinkr");

    // & ESSE useEffect Verifica se o usuário tem TOKEN se não redireciona para o login!
    useEffect( () => {
        if(!userData.token && !token){
            return navigate('/');    
        }
        if(!userData.token){

            axios.post(`${process.env.REACT_APP_API_URL}/verifytoken`, {token})
            
            .then( res =>{
                setUserData(res.data)
            })

            .catch ( err =>{
                console.log(err);
                localStorage.removeItem("tokenLinkr");
                navigate('/');
            });
        }
    }, []);

    return(
        <HeaderTimeLine/>
    );
}
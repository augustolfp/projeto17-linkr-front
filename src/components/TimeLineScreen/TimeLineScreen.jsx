import { HeaderTimeLine } from "../HeaderTimeLine";
import userDataContext from "../../contexts/userDataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function TimeLineScreen() {
    const { userData, setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("tokenLinkr");


    useEffect(verifyIfTheUserHaveToken, []);

    function verifyIfTheUserHaveToken (){
        if(!token && !userData.token ){
            return navigate('/') 
        }

        let tokenToVerify = '';
        if(userData.token){ tokenToVerify = userData.token}
        else {tokenToVerify = token}

        if(!userData.token && token){
            console.log('entrou aq')
            axios.post(`${process.env.REACT_APP_API_URL}/verifytoken`, {tokenToVerify})
            
            .then( res =>{
                setUserData(res.data)
            })

            .catch ( err =>{
                console.log(err);
                localStorage.removeItem("tokenLinkr");
                navigate('/');
            });
        }
    }

    return(
        <HeaderTimeLine/>
    );
}
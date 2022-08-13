import axios from "axios";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userDataContext from "../../contexts/userDataContext";
import { HeaderTimeLine } from "../HeaderTimeLine";
import InterfaceBackground from "../InterfaceBackground";
import { BackgroundFeed } from "../BackgroundFeed";
import { HashtagBox } from "../HashtagBox/HashtagBox";


export default function HashtagScreen() {
    const { userData, setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const { hashtag } = useParams();
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
        <>
            <HeaderTimeLine/>
            
            <BackgroundFeed>

                <InterfaceBackground type={`# ${hashtag}`}>

                {/* AQUI VAI VIM POSTS DA HASHTAG */}

                </InterfaceBackground>

                <HashtagBox/>

            </BackgroundFeed>
            

        </>
    );
}

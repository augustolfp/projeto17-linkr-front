import { HeaderTimeLine } from "../HeaderTimeLine";
import userDataContext from "../../contexts/userDataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostBox from "../PostBox/PostBox";
import InterfaceBackground from "../InterfaceBackground";
import { HashtagBox } from "../HashtagBox/HashtagBox";
import styled from "styled-components";

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

                <InterfaceBackground type={'timeline'}>
                    <PostBox />
                </InterfaceBackground>

                <HashtagBox/>

            </BackgroundFeed>
            

        </>
    );
}

const BackgroundFeed =  styled.div`
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
    background-color: #333333;
    height: 91vh;
    gap: 20px;

    @media (max-width: 670px) {
        flex-direction: column;
        align-items: center;
    }

`
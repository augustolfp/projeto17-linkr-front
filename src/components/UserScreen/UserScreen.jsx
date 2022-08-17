import { HeaderTimeLine } from "../HeaderTimeLine";
import userDataContext from "../../contexts/userDataContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InterfaceBackground from "../InterfaceBackground";
import { BackgroundFeed } from "../BackgroundFeed";
import FeedBox from "../FeedBox/FeedBox";

export default function UserScreen() {
    const {userData, setUserData} = useContext(userDataContext);
    const {id} = useParams();
    const token = localStorage.getItem("tokenLinkr");
    const navigate = useNavigate();

    useEffect(verifyIfTheUserHaveToken, [navigate, setUserData, token, userData.token]);

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
                <FeedBox userId={id}/>
            </InterfaceBackground>

        </BackgroundFeed>
      </>
    );
}
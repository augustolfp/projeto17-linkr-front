import { HeaderTimeLine } from "../HeaderTimeLine";
import userDataContext from "../../contexts/userDataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostCreator from "../PostCreator/PostCreator";
import FeedBox from "../FeedBox/FeedBox";
import InterfaceBackground from "../InterfaceBackground";
import { BackgroundFeed } from "../BackgroundFeed";
import { HashtagBox } from "../HashtagBox/HashtagBox";

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
                setUserData({...res.data, token})
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
                  <PostCreator />
                  <FeedBox />
              </InterfaceBackground>

              <HashtagBox/>
          </BackgroundFeed>
        </>
    );
}
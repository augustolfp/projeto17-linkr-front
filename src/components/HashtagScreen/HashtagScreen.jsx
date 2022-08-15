import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userDataContext from "../../contexts/userDataContext";
import { HeaderTimeLine } from "../HeaderTimeLine";
import InterfaceBackground from "../InterfaceBackground";
import { BackgroundFeed } from "../BackgroundFeed";
import { HashtagBox } from "../HashtagBox/HashtagBox";


export default function HashtagScreen() {
    const [postsByHashtag, setPostsByHashtag] = useState([]);
    const { userData, setUserData } = useContext(userDataContext);
    const { hashtag } = useParams();
    const token = localStorage.getItem("tokenLinkr");
    const navigate = useNavigate();


    useEffect(() =>{
        verifyIfTheUserHaveToken()
        getPostsByHashtag()
    }, [hashtag]);

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

    function getPostsByHashtag (){
        axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`)
        .then( res =>{
            console.log(res)
        })
        .catch( err => {
            console.log(err)
            navigate('/timeline')
        })
    }

    return(
        <>
            <HeaderTimeLine/>
            
            <BackgroundFeed>

                <InterfaceBackground type={`# ${hashtag}`}>

                {
                postsByHashtag.length > 0 ?
                "Posts" : "Loading..."
                }

                </InterfaceBackground>

                <HashtagBox/>

            </BackgroundFeed>
            

        </>
    );
}

import axios from "axios";
import userDataContext from "../../contexts/userDataContext";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title, TextBox} from "../Title";
import { ContainerLoginRegister } from "../Form/ContainerLoginRegister";
import { Form } from "../Form/Form";
import { Span } from '../Form/Span';
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Background } from "../BackgroundLogIn&Regist";


export default function SignUpScreen(){
    const { userData } = useContext(userDataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [buttonStatus, setButtonStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(verifyIfTheUserHaveToken, []);

    function verifyIfTheUserHaveToken (){
        const token = localStorage.getItem("tokenLinkr");

        if(userData.token || token){
           return navigate('/timeline')
        }
    }

    function handleSignUp(e){
        e.preventDefault();
        setButtonStatus(true);
        
        axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, {email, password, username, pictureUrl})
        .then(response => {
            navigate("/");
        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data);
            setButtonStatus(false);
        });
    }

    return(
        <Background>
            <Title>
                <TextBox>
                    <h1>linkr</h1>
                    <h2>save, share and discover <br /> the best links on the web</h2>
                </TextBox>
            </Title>

            <ContainerLoginRegister>
                <Form onSubmit={handleSignUp}>
                    
                    <Input value={email} onChange={ (e) => setEmail(e.target.value)}
                    type="email" placeholder="e-mail" required/>

                    <Input  value={password} onChange={ (e) => setPassword(e.target.value)}
                    type="password" placeholder="password" required/>

                    <Input  value={username} onChange={ (e) => setUserName(e.target.value)}
                    type="text" placeholder="username" required/>

                    <Input  value={pictureUrl} onChange={ (e) => setPictureUrl(e.target.value)}
                    type="text" placeholder="picutre url" required/>
                    
                    <Button disabled={buttonStatus}>Sign Up</Button>
                </Form>

                <br />

                <Link to='/' ><Span>Switch back to log in</Span></Link>

            </ContainerLoginRegister>
        </Background>
    );
}
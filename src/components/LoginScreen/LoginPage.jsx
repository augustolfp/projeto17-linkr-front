import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Background } from "../BackgroundLogIn&Regist";
import { useEffect, useState } from "react";
import { Title, TextBox} from "../Title";
import { ContainerLoginRegister } from "../Form/ContainerLoginRegister";
import { Form } from "../Form/Form";
import { Span } from '../Form/Span';
import axios from "axios";


export function LoginPage (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("tokenLinkr");

    useEffect( () => {
        if(token){
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/verifytoken`, {token});
            promise
            .then( res =>{ navigate('/timeline') })
            .catch ( err =>{ console.log(err ); localStorage.removeItem("tokenLinkr") })
        }
    }, []);

    
    function logIn (e){
        e.preventDefault();
        setButtonStatus(true);

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/signin`, {email, password});
        promise.then( res =>{
            console.log(res.data);
            localStorage.setItem("tokenLinkr", res.data.token);
            navigate('/timeline');
        })
        .catch ( err =>{
            console.log(err);
            alert('Email or password incorrect!');
            setButtonStatus(false);
        })
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
                <Form onSubmit={e => logIn(e)}>
                    
                    <Input value={email} onChange={ (e) => setEmail(e.target.value)}
                    type="email" placeholder="e-mail" required/>

                    <Input  value={password} onChange={ (e) => setPassword(e.target.value)}
                    type="password" placeholder="password" required/>
                    
                    <Button disabled={buttonStatus}>Log In</Button>
                </Form>

                <br />

                <Link to='/sign-up' ><Span>First time? Create an account!</Span></Link>

            </ContainerLoginRegister>
        </Background>
    )
}
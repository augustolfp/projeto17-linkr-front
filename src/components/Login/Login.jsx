import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Background } from "../BackgroundLogIn&Regist";
import { useEffect, useState } from "react";
import { Title, TextBox} from "../Title";
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


// & SOME CSS COMPONENTS

const ContainerLoginRegister = styled.div`
    display: flex; flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    width: 30%;

    @media (max-width: 900px) {
        width: 100%;
        padding: 30px 10px 100px 10px;
        box-sizing: border-box;
    }
`

const Span = styled.span`
    font-family: 'Lato', sans-serif;
    color: white;
    text-decoration: underline;
    &:hover{
        cursor: pointer;
        text-decoration: none;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 8px;
`

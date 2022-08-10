import { Link, useNavigate } from "react-router-dom";
import { Input } from "../Form/Input";
import { Button } from "../Form/Button";
import { Background } from "../BackgroundLogIn&Regist";
import { useEffect, useState, useContext } from "react";
import userDataContext from "../../contexts/userDataContext";
import { Title, TextBox} from "../Title";
import { ContainerLoginRegister } from "../Form/ContainerLoginRegister";
import { Form } from "../Form/Form";
import { Span } from '../Form/Span';
import axios from "axios";


export function LoginPage (){
    const { setUserData } = useContext(userDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const navigate = useNavigate();

    // & Esse useEffect verifica se o usuário já ta logado verificando a validação do seu token, se tiver.
    useEffect( () => {
        const token = localStorage.getItem("tokenLinkr");
        if(token){
            const promise = axios.post(`${process.env.REACT_APP_API_URL}/verifytoken`, {token});
            promise
            .then( res =>{ navigate('/timeline') })
            .catch ( err =>{ console.log(err ); localStorage.removeItem("tokenLinkr") });
        }
    }, []);

    function logIn (e){
        e.preventDefault();
        setButtonStatus(true);


        axios.post(`${process.env.REACT_APP_API_URL}/signin`, {email, password})
    
        .then( res =>{
            console.log(res.data);
            localStorage.setItem("tokenLinkr", res.data.token);
            setUserData(res.data);
            navigate('/timeline');
        })

        .catch ( err =>{
            if(err.response.status === 401){
                alert('Email or password incorrect!');
            } else if (err.response.status === 422) {
                alert('Invalid email!');
            } else {
                alert(err.message);
            }
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
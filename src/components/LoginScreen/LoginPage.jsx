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
    const { setUserData, userData } = useContext(userDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();


    useEffect(verifyIfTheUserHaveToken, []);

    function verifyIfTheUserHaveToken (){
        const token = localStorage.getItem("tokenLinkr");

        if(userData.token || token){
           return navigate('/timeline')
        }
    }

    function logIn (e){
        e.preventDefault();
        setIsDisabled(true);


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
            setIsDisabled(false);
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
                    type="email" placeholder="e-mail" disabled={isDisabled} required/>

                    <Input  value={password} onChange={ (e) => setPassword(e.target.value)}
                    type="password" placeholder="password" disabled={isDisabled} required/>
                    
                    <Button disabled={isDisabled}>Log In</Button>
                </Form>

                <br />

                <Link to='/sign-up' ><Span>First time? Create an account!</Span></Link>

            </ContainerLoginRegister>
        </Background>
    )
}
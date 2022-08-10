import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Container,
    AuthSide,
    WelcomeSide,
    WelcomeBox,
    DataInput,
    GoToLogin
} from "./style";

function RequestRegistration(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    function handleSignUp(e){
        e.preventDefault();
        
        const promise = axios.post("https://projeto17-linkr--back.herokuapp.com/sign-up", {
            email,
            password,
            username,
            image
        });
        promise.then(response => {
            console.log(response.data);
            navigate("/");
        });
        promise.catch(error => {
            console.log(error.response);
            alert("Falha ao enviar os dados!\nPor favor, verifique as informações e insira os dados corretamente.");
        });
    }

    return(
        <form onSubmit={handleSignUp}>
            <DataInput>
                <input
                    type="email"
                    placeholder="e-mail"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name="email"
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name="password"
                />
                <input
                    type="text"
                    placeholder="username"
                    onChange={e => setUserName(e.target.value)}
                    value={username}
                    name="name"
                />
                <input
                    type="text"
                    placeholder="picture url"
                    onChange={e => setImage(e.target.value)}
                    value={image}
                    name="image"
                />
                <button type="submit">
                    Sign Up
                </button>
            </DataInput>
        </form>
    );
}

export default function SignUpScreen(){
    return(
        <Container>
            <WelcomeSide>
                <WelcomeBox>
                    <h2>linkr</h2>
                    <h3>save, share and discover</h3>
                    <h3>the best links on the web</h3>
                </WelcomeBox>
            </WelcomeSide>

            <AuthSide>
                <RequestRegistration />

                <GoToLogin>
                    <Link to="/">
                        <span>Switch back to log in</span>
                    </Link>
                </GoToLogin>
            </AuthSide>
        </Container>
    );
}
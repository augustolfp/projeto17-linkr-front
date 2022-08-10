import styled from "styled-components";

export const Container = styled.div`
    background-color: #333333;
    width: 100%;
    height: 100vh;

    display: flex;

    font-style: normal;
`;

export const WelcomeSide = styled.div`
    background-color: #151515;
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const WelcomeBox = styled.div`
    /* background-color: aquamarine; */
    width: 70%;

    font-weight: 700;
    color: #FFFFFF;

    h2{
        font-family: 'Passion One';
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
    }

    h3{
        font-family: 'Oswald';
        font-size: 43px;
        line-height: 64px;
    }
`;

export const AuthSide = styled.div`
    background-color: #333333;
    width: 40%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const DataInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
    input{
        width: 80%;
        height: 45px;

        margin-bottom: 10px;

        font-family: 'Oswald';
        font-weight: 700;
        font-size: 20px;
        line-height: 40px;
        background: #FFFFFF;
        border: none;
        border-radius: 6px;
    }

    input::placeholder{
        font-size: 20px;
        line-height: 40px;
        color: #9F9F9F;
    }

    button{
        width: 80%;
        height: 45px;

        cursor: pointer;

        font-family: 'Oswald';
        font-size: 20px;
        font-weight: 700;
        line-height: 40px;
        color: #FFFFFF;
        
        background-color: #1877F2;
        border: none;
        border-radius: 6px;
    }
`;

export const GoToLogin = styled.div`
    height: 50px;
    
    display: flex;
    justify-content: center;
    align-items: flex-end;

    span{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        text-decoration-line: underline;
        color: #FFFFFF;
    }
`;
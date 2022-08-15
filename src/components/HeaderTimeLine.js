import styled from "styled-components"
import userDataContext  from '../contexts/userDataContext';
import { IoIosArrowDown } from "react-icons/io";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export function HeaderTimeLine(){
    const [menuEnable, setMenuEnable ] = useState(false);
    const { userData, setUserData } = useContext(userDataContext);
    const navigate = useNavigate();





    function openMenu (){
        setMenuEnable(!menuEnable);
    }

    function logout(){
        setUserData({});
        localStorage.removeItem('tokenLinkr');
        navigate('/');
    }

    function backHome(){
        navigate('/timeline');
    }

    return (
        <Container>
            <BackgroundHeader>

            <BoxTitle onClick={backHome}>linkr</BoxTitle>

            <MenuBox status={menuEnable} >
                <IoIosArrowDown  className="arrow" color= "white" size="1.5em" onClick={openMenu}/>
                <PerfilPhoto image={userData.pictureUrl}></PerfilPhoto>
                
            </MenuBox>

            </BackgroundHeader>
            <NavMenu status={menuEnable}>
                <span onClick={logout}>Logout</span>
            </NavMenu>
        </Container>
        
    )
}






const BackgroundHeader = styled.div`
    box-sizing: border-box;
    padding: 10px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 72px;
    background-color: #151515;
    z-index: 1;
`

const BoxTitle = styled.div`
    color: white;
    font-family: 'Passion One', cursive;
    font-size: 2.8em;
    letter-spacing: 0.1em;
    cursor: pointer;
`

const PerfilPhoto = styled.div`
    border-radius: 50%;
    background: ${props => props.image ? `url(${props.image})` : "white"};
    background-position: center;
    background-size: cover;
    width: 40px;
    height: 40px;
`

const MenuBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    .arrow{
        transition: all 0.5s;
        transform: ${props => props.status ? 'rotate(180deg)': ''};
    }
`

const NavMenu =  styled.div`
    box-sizing: border-box;
    width: 97px;
    height: 72px;
    background-color: #151515;
    position: absolute;
    right: 0px;
    top: ${props => props.status ? '6%': '0%'}; // ! ANIMAÇÃO AQUI
    border-bottom-left-radius: 15px;
    display: flex;
    justify-content: center; align-items: flex-end;
    padding-bottom: 15px;
    transition: all 0.5s;
    span{
        font-family: 'Lato', sans-serif;
        font-size: 0.8em;
        font-weight: bold;
        color: white;
        cursor: pointer;
    }
`

const Container = styled.div`
    display: flex;
`
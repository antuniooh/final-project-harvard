import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './styles.css'

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import peopleIcon from "../../assets/images/icons/peoples.svg";
import registerIcon from "../../assets/images/icons/register.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import api from '../../services/api';

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('users').then(response => {
            setTotalConnections(response.data.length);
        })
    }, [])

    function logout(){
        window.localStorage.removeItem("token");
        window.location.href = window.location.href
    }

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg}
                        alt="Sonetos"></img>
                    <h2>
                        Encontre sua metade da laranja...
                    </h2>
                </div>

                <img src={landingImg}
                    alt="Plataforma de Relacionamento"
                    className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/peoples" className="peoples">
                        <img src={peopleIcon}
                            alt="People"/>
                        Conhecer Pessoas
                    </Link>
                    <Link to="/edit" className="edit">
                        <img src={registerIcon}
                            alt="Edit"/>
                        Editar perfil
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} pessoas cadastradas
                    <img src={purpleHeartIcon}
                        alt="Coração roxo"/>
                        <button className="logout-button" onClick={logout}>Sair</button>
                </span>
                
            </div>

        </div>
    )
}

export default Landing;

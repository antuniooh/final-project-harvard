import React, {useEffect, FormEvent, useState} from "react";
import {Link} from 'react-router-dom';

import './styles.css'

import logoImg from "../../assets/images/logo.svg";
import loginImg from "../../assets/images/login.svg";
import loginIcon from "../../assets/images/icons/login.svg";
import registerIcon from "../../assets/images/icons/signup.svg";
import api from '../../services/api';
import Input from "../../components/Input";
import {useHistory} from "react-router-dom";

function Login() {
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLogUser(e : FormEvent) {
        e.preventDefault();

        api.post('login', {
            username,
            password
        }).then((res) => {
            alert("Login realizado com sucesso!")
            window.localStorage.setItem("token", res.data.token);
            history.push('/')
        }).catch(() => {
            alert("Erro ao realizar Login :(")
        })
    }

    return (
        <div id="page-login">
            <div id="page-login-content" className="container">
                <div className="logo-container">
                    <img src={logoImg}
                        alt="Sonetos"></img>
                    <h2>
                        Seja bem vindo!!
                    </h2>
                </div>

                <img src={loginImg}
                    alt="Plataforma de Relacionamento"
                    className="hero-image"/>

                <div className="main">
                    <div>
                    <form onSubmit={handleLogUser}>
                        <Input name="username" label="Username" type="text"
                            value={username}
                            onChange={
                                (e) => {
                                    setUsername(e.target.value)
                                }
                            }/>
                        <Input name="password" label="Senha" type="text"
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }
                            }/>

                        <div className="buttons-container">
                            <button type="submit" className="peoples">
                                <img src={loginIcon}
                                    alt="Login"/>
                                Autenticar
                            </button>
                            <Link to="/register" className="register">
                                <img src={registerIcon}
                                    alt="Register"/>
                                Registrar
                            </Link>
                        </div>
                    </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login;

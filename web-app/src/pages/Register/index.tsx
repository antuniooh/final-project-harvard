import React, {FormEvent, useState} from "react";
import {useHistory} from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

import "./styles.css";

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')

    function handleCreateClass(e : FormEvent) {
        e.preventDefault();

        api.post('users', {
            name,
            photo,
            age,
            bio,
            subject
        }).then(() => {
            alert("Cadastro realizado com sucesso!")

            history.push('/')
        }).catch(() => {
            alert("Erro ao realizar cadastro :(")
        })
    }

    return (
        <div className="container" id="page-teacher-form">
            <PageHeader title="Parece que você quer encontrar o amor da sua vida" description="O primeiro passo é preencher esse formulario de inscrição."/>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="name" label="Nome Completo"
                            value={name}
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }
                            }/>
                        <Input name="photo" label="Foto"
                            value={photo}
                            onChange={
                                (e) => {
                                    setPhoto(e.target.value)
                                }
                            }/>
                        <Input name="age" label="Idade"
                            value={age}
                            onChange={
                                (e) => {
                                    setAge(e.target.value)
                                }
                            }/>
                        <Textarea name="bio" label="Biografia"
                            value={bio}
                            onChange={
                                (e) => {
                                    setBio(e.target.value)
                                }
                            }/>
                    </fieldset>

                <fieldset>
                    <legend>Preferências</legend>
                    <Select name="subject" label="Sexualidade"
                        value={subject}
                        onChange={
                            (e) => {
                                setSubject(e.target.value)
                            }
                        }
                        options={
                            [
                                {
                                    value: "Homem",
                                    label: "Homem"
                                },
                                {
                                    value: "Mulher",
                                    label: "Mulher"
                                },
                                {
                                    value: "Ambos",
                                    label: "Ambos"
                                },
                                {
                                    value: "Outros",
                                    label: "Outros"
                                }
                            ]
                        }/>
                </fieldset>

            <footer>
                <p>
                    <img src={warningIcon}
                        alt="Aviso Importante"/>
                    Importante
                    <br/>
                    Preencha todos os dados
                </p>
                <button type="submit">Salvar cadastro</button>
            </footer>
        </form>
    </main>
</div>
    );
}

import React, {useEffect, FormEvent, useState} from "react";
import {useHistory} from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

import "./styles.css";

import imageCompression from 'browser-image-compression';
import Resizer from 'react-image-file-resizer';


// import useGeoLocation from "../../services/GeoLocation";

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')

    const [github, setGithub] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [spotify, setSpotify] = useState('')

    const [location, setLocation] = useState('')

    const [subject, setSubject] = useState('')

    // const location = useGeoLocation();

    function handleCreateClass(e : FormEvent) {
        e.preventDefault();

        api.post('users', {
            name,
            photo,
            age,
            bio,
            subject,
            github,
            facebook,
            instagram,
            linkedin
        }).then(() => {
            alert("Cadastro realizado com sucesso!")

            history.push('/')
        }).catch(() => {
            alert("Erro ao realizar cadastro :(")
        })
    }

    async function ReziseToBase64(event) {
        return Resizer.imageFileResizer(
            event.target.files[0],
            300,
            300,
            'JPEG',
            100,
            0,
            uri => {
                console.log(uri)
            },
            'base64'
        );
    }

    const handleFileUpload = async (e) => {
        const base64 = ReziseToBase64(e);
        setPhoto(String(base64));
    }


    return (
        <div className="container" id="page-teacher-form">
            <PageHeader title="Parece que você quer encontrar o amor da sua vida" description="O primeiro passo é preencher esse formulario de inscrição."/>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="name" label="Nome Completo" type="text"
                            value={name}
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }
                            }/>
                        <Input name="photo" label="Foto" type="file"
                            onChange={
                                (e) => {
                                    handleFileUpload(e)
                                }
                            }/>
                        <Input name="age" label="Idade" type="text"
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
                        <Input name="location" label="Cidade" type="text"
                            value={location}
                            onChange={
                                (e) => {
                                    setLocation(e.target.value)
                                }
                            }
                        />

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

                <fieldset>
                <legend>Redes Sociais</legend>
                    <Input name="github" label="Github" type="text"
                        value={github}
                        onChange={
                        (e) => {
                            setGithub(e.target.value)
                        }
                    }/>
                    <Input name="instagram" label="Instagram" type="text"
                        value={instagram}
                        onChange={
                        (e) => {
                            setInstagram(e.target.value)
                        }
                    }/>
                    <Input name="facbook" label="Facebook" type="text"
                        value={facebook}
                        onChange={
                        (e) => {
                            setFacebook(e.target.value)
                        }
                    }/>
                    <Input name="linkedin" label="Linkedin" type="text"
                        value={linkedin}
                        onChange={
                        (e) => {
                            setLinkedin(e.target.value)
                        }
                    }/>
                    <Input name="spotify" label="Spotify" type="text"
                        value={spotify}
                        onChange={
                        (e) => {
                            setSpotify(e.target.value)
                        }
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

import React, {useEffect, FormEvent, useState} from "react";
import {useHistory} from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";

import "./styles.css";

import Resizer from 'react-image-file-resizer';

export default function EditProfile() {
    const history = useHistory();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [language, setLanguage] = useState('')

    const [github, setGithub] = useState('')
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [spotify, setSpotify] = useState('')

    const [location, setLocation] = useState('')
    const [sexuality, setSexuality] = useState('')

    useEffect(() => {
        api.get("loggedUser").then((res) => {
            const user = res.data;
            setUsername(user.username);
            setPassword(user.password)
            setName(user.name)
            setPhoto(user.photo)
            setAge(user.age)
            setBio(user.bio)
            setLanguage(user.language)
            setGithub(user.github)
            setInstagram(user.instagram)
            setFacebook(user.facebook)
            setLinkedin(user.linkedin)
            setSpotify(user.spotify)
            setLocation(user.location)
            setSexuality(user.sexuality)
        })
    } , [])

    function handleCreateClass(e : FormEvent) {
        e.preventDefault();

        api.put('users', {
            username,
            password,
            name,
            photo,
            age,
            bio,
            sexuality,
            github,
            facebook,
            instagram,
            linkedin,
            location,
            spotify,
            language

        }).then(() => {
            alert("Cadastro realizado com sucesso!")

            history.push('/people')
        }).catch(() => {
            alert("Erro ao realizar cadastro :(")
        })
        console.log("aqui 2")
    }

    function handleFileUpload(event) {
        return Resizer.imageFileResizer(
            event.target.files[0],
            100,
            100,
            'JPEG',
            100,
            0,
            uri => {
                setPhoto(String(uri));
            },
            'base64'
        );
    }

    return (
        <div className="container" id="page-teacher-form">
            <PageHeader title="Editar Perfil" link="/" description="Altere as suas informações neste formulario."/>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input name="username" label="Username" type="text"
                            value={username}
                            onChange={
                                (e) => {
                                    setUsername(e.target.value)
                                }
                            }/>
                            <Input name="password" label="Password" type="password"
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }
                            }/>
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
                        <img src={photo} />
                        <Input name="age" label="Idade" type="number"
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

                        <Input name="location" label="Localização" type="text"
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
                        value={sexuality}
                        onChange={
                            (e) => {
                                setSexuality(e.target.value)
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
                    <legend>Programação</legend>
                    <Select name="language" label="Linguagem"
                        value={language}
                        onChange={
                            (e) => {
                                setLanguage(e.target.value)
                            }
                        }
                        options={
                            [
                                {
                                    value: "Java",
                                    label: "Java"
                                },
                                {
                                    value: "Python",
                                    label: "Python"
                                },
                                {
                                    value: "C++",
                                    label: "C++"
                                },
                                {
                                    value: "JavaScript",
                                    label: "JavaScript"
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

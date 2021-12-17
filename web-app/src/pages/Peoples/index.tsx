import React, {FormEvent, useState} from 'react';

import PageHeader from '../../components/PageHeader';
import PeopleItem from '../../components/PeopleItem';
import Select from '../../components/Select';
import Input from "../../components/Input";

import './styles.css';
import api from '../../services/api';
import {People} from '../../components/PeopleItem';


function Peoples() {
    const [peoples, setPeoples] = useState([])

    const [preference, setPreference] = useState('');
    const [language, setLanguage] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [minAge, setMinAge] = useState('');
    const [city, setCity] = useState('');

    async function searchPeople(e : FormEvent) {
        e.preventDefault();

        const response = await api.get('users', {
            params: {
                preference,
                language,
                minAge,
                maxAge,
                city
            }
        })

        setPeoples(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="O amor da sua vida está por aqui">
                <form id="search-people"
                    onSubmit={searchPeople}>

                    <Select name="preference" label="Sexualidade"
                        value={preference}
                        onChange={
                            (e) => {
                                setPreference(e.target.value)
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

                <Input name="minAge" label="Idade Min."
                                            value={minAge}
                                            onChange={
                                                (e) => {
                                                    setMinAge(e.target.value)
                                                }
                                            }/>
                    <Input name="maxAge" label="Idade Máx."
                                value={maxAge}
                                onChange={
                                    (e) => {
                                        setMaxAge(e.target.value)
                                    }
                                }/>


        <Input name="city" label="Cidade"
                            value={city}
                            onChange={
                                (e) => {
                                    setCity(e.target.value)
                                }
                            }/>
                <button type="submit">
                    Buscar
                </button>

            </form>
        </PageHeader>

        <main> {
            peoples.map((people : People) => {
                return <PeopleItem key={
                        people.id
                    }
                    people={people}></PeopleItem>
        })
        } </main>

    </div>
    );
}

export default Peoples;

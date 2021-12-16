import React, {FormEvent, useState} from 'react';

import PageHeader from '../../components/PageHeader';
import PeopleItem from '../../components/PeopleItem';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';
import {People} from '../../components/PeopleItem';


function Peoples() {
    const [peoples, setPeoples] = useState([])

    const [preference, setPreference] = useState('');

    async function searchPeople(e : FormEvent) {
        e.preventDefault();

        const response = await api.get('users', {
            params: {
                preference
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

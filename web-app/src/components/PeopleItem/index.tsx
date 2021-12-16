import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api';
import './styles.css';

export interface People {
    id: number;
    photo: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface PeopleItemProps {
    people: People;
}

const PeopleItem: React.FC < PeopleItemProps > = ({people}) => {
    function createNewConnection(){
        api.post('connections',{
            user_id: people.id
        })
    }

    return (
        <article className="people-item">
            <header>
                <img src={
                        people.photo
                    }
                    alt={
                        people.name
                    }/>
                <div>
                    <strong>{
                        people.name
                    }</strong>
                    <span>{
                        people.subject
                    }</span>
                </div>
            </header>
            <p> {
                people.bio
            } </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ {
                        people.cost
                    }</strong>
                </p>
                {/* <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${people.whatsapp}`}>
                    <img src={whatsappIcon}
                        alt="Whatsapp"/>
                    Entrar em contato
                </a> */}
            </footer>
        </article>
    );
};

export default PeopleItem;

import React from 'react';

import instagramIcon from '../../assets/images/icons/instagram.svg'
import githubIcon from '../../assets/images/icons/github.svg'
import linkedinIcon from '../../assets/images/icons/linkedin.svg'
import spotifyIcon from '../../assets/images/icons/spotify.svg'
import facebookIcon from '../../assets/images/icons/facebook.svg'

import api from '../../services/api';
import './styles.css';

export interface People {
    id: number;
    photo: string;
    bio: string;
    age: number;
    name: string;
    sexuality: string;
    location: string;
    github: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    spotify: string;
}

interface PeopleItemProps {
    people: People;
}

const PeopleItem: React.FC < PeopleItemProps > = ({people}) => {
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
                        people.sexuality
                    }, {
                        people.age
                    } anos - {people.location}</span>
                </div>
            </header>
            <p> {
                people.bio
            } </p>
            
            <footer>
                <a target="_blank" href={`https://github.com/${people.github}`}>
                    <img src={githubIcon}
                        alt="Github"/>
                </a>
                <a target="_blank" href={`https://instagram.com/${people.instagram}`}>
                    <img src={instagramIcon}
                        alt="Instagram"/>
                </a> 
                <a target="_blank" href={`https://linkedin.com/in/${people.linkedin}`}>
                    <img src={linkedinIcon}
                        alt="Linkedin"/>
                </a> 
                <a target="_blank" href={`https://facebook.com/${people.facebook}`} style={{color:'blue'}}>
                    <img src={facebookIcon}
                        alt="Facebook"/>
                </a>  
                <a target="_blank" href={`https://open.spotify.com/user/${people.spotify}`}>
                <img src={spotifyIcon}
                        alt="Spotify"/>
                </a>  
            </footer>
        </article>
    );
};

export default PeopleItem;

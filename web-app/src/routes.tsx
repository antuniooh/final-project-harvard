import React, { useState } from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import EditProfile from './pages/editProfile';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Peoples from './pages/Peoples';
import Register from './pages/Register';

function Routes(){
    var login = window.localStorage.getItem("token");

    return(
        <BrowserRouter>
            <Route path="/" exact component={ login != undefined ? Landing: Login} />
            <Route path="/Sonetos" exact component={ login != undefined ? Landing: Login} />
            <Route path="/peoples" component={ login != undefined ? Peoples: Login}/>
            <Route path="/register" component={Register} />
            <Route path="/login" component={ login != undefined ? Landing: Login}  />
            <Route path="/edit" component={ login != undefined ? EditProfile: Login} />

        </BrowserRouter>
    )
}

export default Routes
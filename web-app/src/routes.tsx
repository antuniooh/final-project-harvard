import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import EditProfile from './pages/editProfile';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Peoples from './pages/Peoples';
import Register from './pages/Register';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/peoples" component={Peoples} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/edit" component={EditProfile} />

        </BrowserRouter>
    )
}

export default Routes
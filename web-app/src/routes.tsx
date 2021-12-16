import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';

import Landing from './pages/Landing';
import Peoples from './pages/Peoples';
import Register from './pages/Register';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/Sonetos" exact component={Landing} />
            <Route path="/peoples" component={Peoples} />
            <Route path="/register" component={Register} />
        </BrowserRouter>
    )
}

export default Routes
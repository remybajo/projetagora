import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import { Provider} from 'react-redux';
import { connect} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import token from './reducers/token'
import publiToken from './reducers/publiToken'
import Accueil from './Accueil';
import Inscription from './inscription';
import Profilcomp from './profilcomp';
import Thematique from './Thematique';
import nouvelPublication from './nouvelPublication';
import Test from './Test';
import Publication from './publication';
//import Cookies from 'js-cookie';



const store = createStore(combineReducers({token, publiToken}))

function App(props) {
 
  return (

    <Provider store={store} >
      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
          <Route component={Test} path="/test" exact />
          <Route component={Inscription} path="/inscription" exact />
          <Route component={Profilcomp} path="/profilcomp" exact />
          <Route component={Publication} path="/publication" exact/>
          <Route component={Thematique} path="/Thematique" exact/>
          <Route component={nouvelPublication} path="/nouvelPublication" exact/>
        </Switch>
      </Router>
      
   

    </Provider>
  );
}

export default App;
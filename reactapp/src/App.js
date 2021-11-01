import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from "./reducers/token";
import publiToken from "./reducers/publiToken";
import PageProfil from "./pageprofil";
import PageProfil2 from "./pageprofil2";
import Accueil from "./Accueil";
import Inscription from "./inscription";
import Profilcomp from "./profilcomp";
import Thematique from "./Thematique";
import nouvelPublication from "./nouvelPublication";
import Test from "./Test";
import Publication from "./publication";
import CompleterProfil from "./completerProfil";
import PageThemeEducation from "./pageThemeEducation";
import EnTete from "./EnTete.js";
import SideBarDroite from "./SideBarDroite";
import PageTheme from "./PageTheme";

//import Cookies from 'js-cookie';

const store = createStore(combineReducers({ token, publiToken}));

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={Accueil} path="/" exact />
          <Route component={Test} path="/test" exact />
          <Route component={PageProfil} path="/pageprofil" exact />
          <Route component={PageProfil2} path="/pageprofil2" exact />
       
          
          <Route component={Profilcomp} path="/profilcomp" exact />
          <Route component={Publication} path="/publication/:id" exact />
          <Route component={Thematique} path="/Thematique" exact />
         
          <Route
            component={nouvelPublication}
            path="/nouvelPublication"
            exact
          />
          <Route component={CompleterProfil} path="/completerProfil" exact />
          <Route component={EnTete} path="/EnTete" exact />
          <Route component={SideBarDroite} path="/SideBarDroite" exact />
          <Route component={PageTheme} path="/PageTheme" exact />
          <Route component={PageThemeEducation} path="/pageThemeEducation" exact />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

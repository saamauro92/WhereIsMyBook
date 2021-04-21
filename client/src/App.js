import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home'
import Menu from './components/Menu';
import Persona from './components/Persona';
import Libro from './components/Libro';
import Generos from './components/Generos';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AgregarPersona from './components/AgregarPersona';

function App() {



  const dispatch = useDispatch();


  React.useEffect(async () => {

    const respuesta = await axios.get('http://localhost:3000/persona');
    dispatch({ type: 'VER_PERSONAS', personaState: respuesta.data });


  }, []);




  return (

    <div className="App">




      <Router>


        <Menu />


        <Route exact path="/" component={Home} />
        <Route exact path="/persona" component={Persona} />
        <Route exact path="/libro" component={Libro} />
        <Route exact path="/generos" component={Generos} />

        <Route exact path="/persona/agregar" component={AgregarPersona} />
      </Router>





    </div>
  );
}

export default App;

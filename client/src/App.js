import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Persona from './components/persona/Persona';
import AgregarPersona from './components/persona/AgregarPersona';
import Libro from './components/libro/Libro';
import AgregarLibro from './components/libro/AgregarLibro';
import PrestarLibro from './components/libro/PrestarLibro';
import Categoria from './components/categoria/Categoria';
import AgregarCategoria from './components/categoria/AgregarCategoria';



function App(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const VerPersonas = async () => {
      const respuesta = await axios.get('http://localhost:3000/persona');
      dispatch({ type: 'VER_PERSONAS', listadoPersona: respuesta.data });
    };

    const VerLibros = async () => {
      const respuesta = await axios.get('http://localhost:3000/libro');
      dispatch({ type: 'VER_LIBROS', storeActionLibros: respuesta.data });
    };

    const VerGeneros = async () => {
      const respuesta = await axios.get('http://localhost:3000/categoria');
      dispatch({ type: 'VER_CATEGORIA', listadoDeCategorias: respuesta.data });
    };
    VerPersonas();
    VerLibros();
    VerGeneros();
  }, [dispatch]);



  return (


    <div className="App">

      <Router>

        <Sidebar/>
        <div className="app-body">

        <Route exact path="/" />
        <Route exact path="/persona" component={Persona} />
        <Route exact path="/persona/agregar" component={AgregarPersona} />
        <Route exact path="/libro" component={Libro} />
        <Route exact path="/libro/agregar" component={AgregarLibro} />
        <Route exact path="/libro/prestar/:id" component={PrestarLibro} />
        <Route exact path="/categoria" component={Categoria} />
        <Route exact path="/categoria/agregar" component={AgregarCategoria} />
        </div>
      </Router>





    </div>

  );
}

export default App;

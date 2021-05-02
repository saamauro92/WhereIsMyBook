import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import axios from 'axios';

function UnaPersona(props) {
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();
    const handleBorrarPersona = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/persona/${idABorrar}`);
            dispatch({ type: 'REMOVER_PERSONA', idPersonaARemover: idABorrar });
            props.history.push('/persona');
        } catch (e) {
            console.log("error en el servidor")
        }

    }




    const handleLibro = (idPersona) => {

        setToggle(false);


    }


    return (

        <>

            <div id={props.id} >

                <div className="listado_contenedor">
                    <div className="lista">

                        <div className="lista_id">
                            {props.id}
                        </div>

                        <div className="lista_nombre">
                            {props.nombre}
                        </div>
                        <div className="lista_apellido">
                            {props.apellido}
                        </div>
                        <div className="lista_email">
                            {props.email}
                        </div>
                        <div className="lista_alias">
                            {props.alias}
                        </div>
                        <div className="lista_editar">
                            <Link to={"/persona/editar/" + props.id}> Editar</Link>
                        </div>
                        <div className="lista_editar">
                            <Link onClick={() => handleBorrarPersona(props.id)}> Borrar</Link>
                        </div>


                        <div className="lista_editar">
                            <Link onClick={() => handleLibro(props.id)}> Libro</Link>

                            <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                            {props.libro}
                        </div>
                        </div>
                



                    </div>
                </div>


            </div>


        </>
    )
}





export default function Persona(props) {

    const listadoPersonas = useSelector((state) => state.persona);
    const listadoDeLibros = useSelector((state) => state.libro);

    const datosJuntos = listadoPersonas.map(personaB => {
        const libro = listadoDeLibros.find(libroB => libroB.persona_id == personaB.id)
        return { id: personaB.id, nombre: personaB.nombre, apellido: personaB.apellido, email: personaB.email, alias: personaB.alias, nombreLibro: libro ? libro.nombre : "No Posee libro" }

    })


    return (
        <>
            <div>
                <h2>Persona</h2>

                <Link to="/persona/agregar">  <h3>+ agregar persona</h3> </Link>

                {
                    datosJuntos.map((persona, index) => <UnaPersona key={index} id={persona.id} render={true} nombre={persona.nombre} apellido={persona.apellido} email={persona.email} libro={persona.nombreLibro} alias={persona.alias} />)
                }


            </div>

        </>
    )
}



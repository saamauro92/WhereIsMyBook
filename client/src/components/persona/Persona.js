import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EditarPersona from './EditarPersona';
import AgregarPersona from './AgregarPersona';

function UnaPersona(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("")
    const [abrirModalSuccess, setAbrirModalSuccess] = useState("");
    const [abrirModalFailed, setAbrirModalFailed] = useState("");

    const [toggle, setToggle] = useState(true);
    const [modal, setModal] = useState(false);
    const [errorBorrar, setErrorBorrar] = useState("")
    const dispatch = useDispatch();

    const handleEditarPersona = (id) => {

        setModal(!modal);

    }




    const handleBorrarPersona = async (idABorrar) => {
       

        try {

         await axios.delete(`http://localhost:3000/persona/${idABorrar}`);
            dispatch({ type: 'REMOVER_PERSONA', idPersonaARemover: idABorrar });
            setAbrirModalSuccess(!abrirModalSuccess)
            setSuccesMessage("Persona borrada con exito!")
      
        }  catch (e) {
            try {
             setAbrirModalFailed(!abrirModalFailed) 
                 setErrorMessage(e.response.data.mensaje)  

            } catch (e2) {
             setAbrirModalFailed(!abrirModalFailed) 
               setErrorMessage(e.message) 

            }

        }

    }




    const handleLibro = (idPersona) => {

        setToggle(!toggle);


    }


    return (

        <>
        

            <div  className="card" id={props.id} >

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
{/*  EDITAR  */}
                            <button onClick={() => handleEditarPersona(props.id)}> EDITAR</button>
                           { modal &&    <EditarPersona id={props.id} setModal={setModal} modal={modal} />}
                


                        </div>
{/*  BORRAR  */}
                        <div className="lista_editar">
                            <button onClick={() => handleBorrarPersona(props.id)}> Borrar</button>
                       
                            <div className={abrirModalSuccess ? "modalSucces" : "modalSucces-no"}>
                                <div className="modal-content">
                                    <p> {succesMessage} </p>

                                    <button onClick={() => setAbrirModalSuccess(!abrirModalSuccess)} >cerrar</button>
                                </div>
                            </div>

                            <div className={abrirModalFailed ? "modalSucces" : "modalSucces-no"}>
                                <div className="modal-content">
                                    <p>  - {props.id} -{props.nombre} {props.apellido}:  {"error proveniente del server- " && errorMessage}</p>

                                    <button onClick={()=> setAbrirModalFailed(!abrirModalFailed)}  >cerrar</button>
                                </div>
                            </div>


                        </div>

{/*  LIBRO PRESTADO  */}
                        <div className="lista_editar">
                            <button onClick={() => handleLibro(props.id)}> Libro</button>

                            <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                                <p> {props.libro} </p>
                         
                            </div>
       
                        </div>




                    </div>
                </div>


            </div>

       
        </>
    )
}





export default function Persona(props) {
     const [agregarPersona, setAgregarPersona] = useState(false)
    const listadoPersonas = useSelector((state) => state.persona);
    const listadoDeLibros = useSelector((state) => state.libro);

    const handleAdPerson = (id) => {

        setAgregarPersona(!agregarPersona);

    }


    const datosJuntos = listadoPersonas.map(personaB => {
        const libro = listadoDeLibros.find(libroB => libroB.persona_id === personaB.id)
        return { id: personaB.id, nombre: personaB.nombre, apellido: personaB.apellido, email: personaB.email, alias: personaB.alias, nombreLibro: libro ? libro.nombre : "No Posee libro" }

    })


    return (
        <>
            <div>
                <h2 className="personaTitle">Persona</h2>
                <button className="addPersona" onClick={() => handleAdPerson(props.id)}> +Agregar Persona</button>

                <div className="container"> 

                           { agregarPersona &&    <AgregarPersona id={props.id} agregarPersona={agregarPersona} setAgregarPersona={setAgregarPersona} />}
              
                {
                    datosJuntos.map((persona, index) => <UnaPersona key={index} id={persona.id} render={true} nombre={persona.nombre} apellido={persona.apellido} email={persona.email} libro={persona.nombreLibro} alias={persona.alias} />)
                }


            </div>
            </div>
        </>
    )
}



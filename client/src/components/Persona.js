import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function UnaPersona(props) {
    const dispatch = useDispatch();
    const [toggled, setToggled] = useState(true);


    const editarFondo = () => {
        setToggled(!toggled)
    }


    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        alias: ''
        
    });


    const handleBorrarPersona = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/persona/${idABorrar}`);
            dispatch({ type: 'REMOVER_PERSONA', idPersonaARemover: idABorrar });
            props.history.push('/persona');
        } catch (e) {
            console.log("error en el servidor")
        }

    }

/// actualiza a la persona pero no cambia de pantalla. VER*
    const SaveChange = async (idAModificar) => {
        try {
            const respuesta = await axios.put(`http://localhost:3000/persona/${idAModificar}`, form);
            dispatch({ type: 'MODIFICAR_UNA_PERSONA', storeAModificar: idAModificar });
            if(respuesta.status===204 || respuesta.status===200);           
            props.history.push('/persona');
         
        } catch (e) {
            console.log('problema con el servidor')
        }
    };


    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };


    const handleSurnameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.apellido = e.target.value;
        setForm(newForm);
    };

    const handleUsernameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
        setForm(newForm);
    };







    return (
        <div prop={props.id} className={toggled ? "card" : "card_selected "}>


            <ul>
                <li >Id: {props.id} </li>
                <input type="text" className={toggled ? "boton_editar" : "boton_editar_visible"} value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
                <input type="text" className={toggled ? "boton_editar" : "boton_editar_visible"} value={form.apellido} onChange={handleSurnameChange} placeholder="Apellido" />
                <li value={form.nombre} className={toggled ? "boton_editar_visible" : "boton_editar"} onChange={handleNameChange}> {props.nombre} </li>
                <li value={form.apellido} className={toggled ? "boton_editar_visible" : "boton_editar"} onChange={handleSurnameChange} >{props.apellido} </li>
                <li >{props.email} </li>
                <input type="text" className={toggled ? "boton_editar" : "boton_editar_visible"} value={form.alias} onChange={handleUsernameChange} placeholder="Alias" />
                <li className={toggled ? "boton_editar_visible" : "boton_editar"}>{props.alias} </li>
                <div className={toggled ? "boton_editar" : "boton_editar_visible"} >
                    <button onClick={()=> SaveChange(props.id)} > GUARDAR</button>

                </div>
            </ul>

            <div className="card_bottom">

                <h6>libro</h6>
                <h6 onClick={editarFondo}>editar</h6>
                <h6 onClick={() => handleBorrarPersona(props.id)}>eliminar</h6>

        
            </div>


        </div>
    )
}



export default function Persona(props) {


    const listadoPersonas = useSelector((state) => state.persona);

    return (

        <div>

            <h2> Persona</h2>

            <Link to="/persona/agregar"> <h3> +Agregar Persona(tooltip)</h3> </Link>
            <div className="container">


                {listadoPersonas.map((persona, index)=> <UnaPersona key={index} id={persona.id} nombre={persona.nombre} apellido={persona.apellido} email={persona.email} alias={persona.alias}  />)}


            </div>

        </div>
    )
}
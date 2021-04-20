import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function AgregarPersona(props) {


    const dispatch = useDispatch();
    const [form, setForm] = React.useState({
        nombre: '',
        apellido: '',
        email: "",
        alias: ""
    });



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

    const handleEmailChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.email = e.target.value;
        setForm(newForm);
    };

    const handleUsernameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
        setForm(newForm);
    };


    const handleCancel = () => {
        props.history.push('/persona');
    };


    const handleSave = async () => {
        try {
            const respuesta = await axios.post(`http://localhost:3000/persona`, form);
            dispatch({ type: 'AGREGAR_UNA_PERSONA', listado: respuesta.data });
            props.history.push('/persona');
        } catch (e) {
            console.log('problema con el servidor')
        }
    };



    return (

        <div>
            <h2> Agregar Persona</h2>

            <form action="">

                <input type="text" value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
                <input type="text" value={form.apellido} onChange={handleSurnameChange} placeholder="Apellido" />
                <input type="email" value={form.email} onChange={handleEmailChange} placeholder="Email" />
                <input type="text" value={form.alias} onChange={handleUsernameChange} placeholder="Alias" />


                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </form>


        </div>
    )
}
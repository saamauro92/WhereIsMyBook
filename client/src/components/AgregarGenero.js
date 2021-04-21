import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function AgregarGenero(props) {


    const dispatch = useDispatch();
    const [form, setForm] = React.useState({
        nombre: '',

    });



    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
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
            <h2> Agregar Genero</h2>

            <form action="">

                <input type="text" value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />



                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
            </form>


        </div>
    )
}
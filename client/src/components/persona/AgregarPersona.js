import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';





export default function AgregarPersona(props) {


    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        alias: ''

    });

    const handleCancel = () => {
        props.history.push('/persona');
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



    const onSave = async () => {
        try {
            const respuesta = await axios.post(`http://localhost:3000/persona`, form);
            dispatch({ type: 'AGREGAR_UNA_PERSONA', storeActionPersona: respuesta.data });
            props.history.push('/persona');



        } catch (e) {



        }



    }


    console.log(form)


    return (
        <>

            <div className="formulario_persona">



                <div>
                    <label >Nombre</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                </div>
                <div >
                    <label >Apellido</label>
                    <input type="text" name="apellido" value={form.apellido} onChange={handleSurnameChange} />
                </div>
                <div >
                    <label >Email</label>
                    <input type="text" name="email" value={form.email} onChange={handleEmailChange} />
                </div>
                <div >
                    <label >Alias</label>
                    <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                </div>
                <button type="submit" onClick={onSave}> Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>

            </div>

        </>
    )
}



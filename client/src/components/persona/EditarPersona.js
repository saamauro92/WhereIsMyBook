import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



export default function EditarPersona(props) {
    const listadoPersonas = useSelector((state) => state.persona);
    const params = useParams();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        alias: ''

    });

    const handleCancel = () => {
        props.history.push('/persona');
    };


    const buscarPersonaPorId = async (idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/persona/' + idPersona)
            setForm(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarPersonaPorId(params.id)
    }, [params])

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
        var newForm = JSON.parse(JSON.stringify(form));
        newForm.email = "";
        setForm(newForm);
    };




    const handleUsernameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
        setForm(newForm);
    };





    const onSave = async () => {
        try {
            console.log(form)
            const respuesta = await axios.put('http://localhost:3000/persona/' + params.id, form);
            dispatch({ type: 'MODIFICAR_UNA_PERSONA', idPersonaAModificar: respuesta.data });
            props.history.push('/persona');

        } catch (e) {



        }



    }




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
                    <input type="text" name="email" value={form.email} />
                </div>
                <div >
                    <label >Alias</label>
                    <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                </div>
                <button onClick={onSave}> Guardar</button>

                <button onClick={handleCancel}>Cancelar</button>
            </div>

        </>
    )
}



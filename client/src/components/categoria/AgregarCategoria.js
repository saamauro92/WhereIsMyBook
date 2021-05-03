import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';





export default function AgregarCategoria(props) {


    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: ''
    });

    const handleCancel = () => {
        props.history.push('/categoria');
    };



    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

 



    const onSave = async () => {
        try {
            const respuesta = await axios.post(`http://localhost:3000/categoria`, form);
            dispatch({ type: 'AGREGAR_UNA_CATEGORIA', storeActionCategoria: respuesta.data });
            props.history.push('/categoria');



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
                
                <button type="submit" onClick={onSave}> Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>

            </div>

        </>
    )
}



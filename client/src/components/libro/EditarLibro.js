import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"


export default function EditarLibro(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        descripcion: '',

    });
    const [devolver, setDevolver] = React.useState({
        persona_id:""
    })

    const handleCancel = () => {
        props.history.push('/libro');
    };


    const buscarLibroPorId = async (idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/libro/' + idLibro)
            setForm(respuesta.data)
            setDevolver(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarLibroPorId(params.id)
    }, [params])

    const handleDescriptionChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
        setForm(newForm);
    };




    const onSave = async () => {
        try {
            console.log(form)
            const respuesta = await axios.put('http://localhost:3000/libro/' + params.id, form);
            dispatch({ type: 'MODIFICAR_UN_LIBRO', idLibroAModificar: respuesta.data });
            props.history.push('/libro');

        } catch (e) {



        }



    }



    return (
        <>

            <div className="formulario_persona">


                <div>
                    <label >Descripcion del libro</label>
                    <input type="text" name="descripcion" value={form.descripcion} onChange={handleDescriptionChange} />
                </div>



                <button onClick={onSave}> Guardar</button>

                <button onClick={handleCancel}>Cancelar</button>
            </div>

        </>
    )
}



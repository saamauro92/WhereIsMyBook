import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



export default function EditarCategoria(props) {
    const listadoCategorias = useSelector((state) => state.categoria);
    const params = useParams();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: ''
    });

    const handleCancel = () => {
        props.history.push('/categoria');
    };


    const buscarCategoriaPorId = async (idCategoria) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/categoria/' + idCategoria)
            setForm(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarCategoriaPorId(params.id)
    }, [params])

    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    const onSave = async () => {
        try {
            console.log(form)
            const respuesta = await axios.put('http://localhost:3000/categoria/' + params.id, form);
            dispatch({ type: 'MODIFICAR_UNA_CATEGORIA', idCategoriaAModificar: respuesta.data });
            props.history.push('/categoria');

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
                
                <button onClick={onSave}> Guardar</button>

                <button onClick={handleCancel}>Cancelar</button>
            </div>

        </>
    )
}



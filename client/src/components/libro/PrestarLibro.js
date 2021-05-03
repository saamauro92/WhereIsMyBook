import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';




export default function PrestarLibro(props) {
    const params = useParams();
    const listadoPersonas = useSelector((state) => state.persona);
    const listadoDeLibros = useSelector((state) => state.libro);
    const dispatch = useDispatch();

const idDelLibro = props.id;

    const [form, setForm] = React.useState({
        persona_id: "",
    });



   const buscarLibroPorId = async (idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/libro/' + idLibro)
            setForm(respuesta.data)

        } catch (e) {

        }
    }


    React.useEffect(() => {
        if (!idDelLibro) return;
        buscarLibroPorId(idDelLibro)
    }, [idDelLibro]) 

    const handlePersonaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);

    };

    //PRESTAR


    const onSave = async (idAModificar) => {

        try {
            const respuesta = await axios.put('http://localhost:3000/libro/prestar/' + idAModificar, form);
            dispatch({ type: 'PRESTAR', idAPrestar: form });
            props.history.push('/libro');
            console.log("RESPUESTAA ", form, respuesta)
        } catch (e) {
        }

    }


    return (
        <div>
            <select value={props.persona_id} onChange={handlePersonaChange} >
                <option value="" disabled selected hidden> Elegir persona  </option>

                {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.alias} </option>)}
            </select>
            <button onClick={()=> onSave(props.id)}> Prestar</button>


        </div>
    )
}


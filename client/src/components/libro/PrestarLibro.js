import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';




export default function PrestarLibro(props) {
    const params = useParams();
    const listadoPersonas = useSelector((state) => state.persona);
    const listadoDeLibros = useSelector((state) => state.libro);
    const dispatch = useDispatch();



    let [form, setForm] = React.useState({
        id:"",
        persona_id: "",
    });



/*     const buscarLibroPorId = async (id) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/libro/' + id)
            setForm(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect((props) => {
        if (props.id) return;
        buscarLibroPorId(props.id)
    }, []) */

    const handlePersonaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);

    };

    //PRESTAR


    const onSave = async (idAmodificar) => {
        try {
            console.log(form)
            const respuesta = await axios.put('http://localhost:3000/libro/prestar/' + idAmodificar, form);
            console.log(respuesta)
           dispatch({ type: 'PRESTAR_UN_LIBRO', idLibroAPrestar: respuesta.data});  
            props.history.push('/libro');

        } catch (e) {
        }

    }




    return (
        <div>
                    <select value={props.persona_id}  onChange={handlePersonaChange} >
            <option value="" disabled selected hidden> {form.persona_id} </option>
            <option value=""  >Sin prestar</option>
                {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.nombre} </option>)}
            </select>
            <button onClick={()=> onSave(props.id)}> Prestar</button>
        

        </div>
    )
}


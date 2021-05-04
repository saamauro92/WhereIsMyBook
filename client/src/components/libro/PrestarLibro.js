import React from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


export default function PrestarLibro(props) {

    const listadoPersonas = useSelector((state) => state.persona);
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
    }, [])

    const handlePersonaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);

    };

    //PRESTAR


    const onSave = async (idAModificar) => {

        try {
            if (form) {

                delete form.nombre;
                delete form.descripcion;
                delete form.categoria_id;
                const respuesta = await axios.put('http://localhost:3000/libro/prestar/' + idAModificar, form);
                dispatch({ type: 'PRESTAR', idAPrestar: form });
                console.log(form)
            }

            props.history.push('/libro');

        } catch (e) {
        }

    }


    return (
        <div>
            <select value={props.persona_id}  onChange={handlePersonaChange} >
                <option value="0"    selected   disabled hidden> Elegir persona  </option>

                {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.alias} </option>)}
            </select>
            <button onClick={() => onSave(props.id)}> Prestar</button>


        </div>
    )
}


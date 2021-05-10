import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


export default function PrestarLibro(props) {


    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("")
    const [enviado, setEnviado] = useState(false);
    const [noEnviado, setNoEnviado] = useState(false);
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
                await axios.put('http://localhost:3000/libro/prestar/' + idAModificar, form);
                dispatch({ type: 'PRESTAR', idAPrestar: form });
                console.log(form)
                setSuccesMessage("Book taken succesfully!")
                setEnviado(!enviado);
            }


        } catch (e) {
            try {

                setNoEnviado(!noEnviado);
                setErrorMessage(e.response.data.mensaje)

            } catch (e2) {
                setNoEnviado(!noEnviado);
                setErrorMessage(e.response.data.mensaje)

            }

        }


    }


    return (
        <div>
            <button onClick={() => onSave(props.id)}> Lend</button>

            <select value={props.persona_id} onChange={handlePersonaChange} >
                <option value="0" selected disabled hidden> Choose User  </option>

                {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.alias} </option>)}
            </select>


            <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                <div className="modal-content">
                    <p>{succesMessage} </p>

                    <button onClick={() => setEnviado(!enviado)} >Close</button>
                </div>

            </div>

            <div className={noEnviado ? "modalSucces" : "modalSucces-no"}>
                <div className="modal-content">
                    <p> {"Error from server" && errorMessage}  </p>
                    <button onClick={() => setNoEnviado(!noEnviado)} >Close</button>
                </div>

            </div>

        </div>
    )
}


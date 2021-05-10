import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';





export default function AgregarPersona(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const setAgregarPersona = props.setAgregarPersona;
    const [enviado, setEnviado] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        alias: ''

    });



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


    const validateForm = () => {
        if (!form.nombre || !form.apellido || !form.alias || !form.email) {
            return { validation: false, errorMessage: "*Please complete all required fields" };
        } else {
            return { validation: true, errorMessage: "" };

        }
    }


    const onSave = async () => {
        let formValidation = validateForm();
        if (!formValidation.validation) {
            setErrorMessage(formValidation.errorMessage);
        } else {
            let respuesta

            try {
                respuesta = await axios.post(`http://localhost:3000/persona`, form);
                dispatch({ type: 'AGREGAR_UNA_PERSONA', storeActionPersona: respuesta.data });


                setEnviado(!enviado);

            } catch (e) {

            }

        }



    }

    const handleCerrar = () => {
        setAgregarPersona(!setAgregarPersona)

    };

    const handleCerrarFormEnviado = () => {
        setAgregarPersona(!setAgregarPersona)
        setEnviado(!enviado);
    };


    return (
        <>
            <div className="modal">

                <div className="formulario_persona modal-content">

                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle "> Add User</h4>

                    <div className="form-wrapper">
                        <div className="form-item ">
                            <label >Name</label>
                            <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                        </div>
                        <div className="form-item ">
                            <label >Surname</label>
                            <input type="text" name="apellido" value={form.apellido} onChange={handleSurnameChange} />
                        </div>
                        <div className="form-item " >
                            <label >Email</label>
                            <input type="text" name="email" value={form.email} onChange={handleEmailChange} />
                        </div>
                        <div className="form-item " >
                            <label >Username</label>
                            <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                        </div>
                        <div className="form-button">
                            <button type="submit" onClick={onSave}> Save</button>
                            <button onClick={handleCerrar}>Cancel</button>

                        </div>
                        <p>   {errorMessage} </p>
                        <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                            <div className="modal-content">

                                <h2>User added succesfully!</h2>
                                <button onClick={handleCerrarFormEnviado} >Close</button>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}



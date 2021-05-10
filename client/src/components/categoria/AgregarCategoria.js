import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';





export default function AgregarCategoria(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const setAgregarCategoria = props.setAgregarCategoria;
    const [enviado, setEnviado] = useState(false);

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: ''
    });

    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };


    const validateForm = () => {
        if (!form.nombre) {
            return { validation: false, errorMessage: "*Field cannot be empty" };
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
                respuesta = await axios.post(`http://localhost:3000/categoria`, form);
                dispatch({ type: 'AGREGAR_UNA_CATEGORIA', storeActionCategoria: respuesta.data });
                setEnviado(!enviado);



            } catch (e) {
            }


        }




    }



    const handleCerrar = () => {
        setAgregarCategoria(!setAgregarCategoria)

    };

    const handleCerrarFormEnviado = () => {
        setAgregarCategoria(!setAgregarCategoria)
        setEnviado(!enviado);
    };


    console.log(form)


    return (
        <>
            <div className="modal">
                <div className="formulario_persona modal-content">
                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle">Add Category</h4>
                    <div className="form-wrapper">

                        <div className="form-item">
                            <label >Name</label>
                            <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                        </div>
                        <div className="form-item">

                        </div>
                        <div className="form-button">

                            <button type="submit" onClick={onSave}> Save</button>
                            <button onClick={handleCerrar}>Cancel</button>


                            <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                                <div className="modal-content">

                                    <h2>Category added succesfully!</h2>
                                    <button onClick={handleCerrarFormEnviado} >Close</button>
                                </div>
                            </div>

                        </div>
                        <p>   {errorMessage} </p>
                    </div>
                </div>
            </div>

        </>
    )
}



import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';





export default function AgregarLibro(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const setAgregarLibro = props.setAgregarLibro;
    const [enviado, setEnviado] = useState(false);
    const categoria = useSelector((state) => state.categoria);
    const listadoPersonas = useSelector((state) => state.persona);


    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id: "",
        persona_id: ""
    });

    const dispatch = useDispatch();
    console.log(form);

    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };


    const handleDescripcionChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
        setForm(newForm);
    };

    const handleCategoriaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.categoria_id = e.target.value;
        setForm(newForm);
    };

    const handlePersonaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);

    };


    const validateForm = () => {
        if (!form.nombre || !form.descripcion || !form.categoria_id) {
            return { validation: false, errorMessage: "*Please complete all required fields." };
        } else {
            return { validation: true, errorMessage: "" };

        }
    }





    const handleSave = async () => {
        let formValidation = validateForm();
        if (!formValidation.validation) {
            setErrorMessage(formValidation.errorMessage);
        } else {
            let respuesta
            try {
                respuesta = await axios.post(`http://localhost:3000/libro`, form);
                dispatch({ type: 'AGREGAR_LIBRO', storeActionLibro: respuesta.data });
                setEnviado(!enviado);

            } catch (e) {
                console.log('Server problem')
            }
        }
    };


    const handleCerrar = () => {
        setAgregarLibro(!setAgregarLibro)

    };

    const handleCerrarFormEnviado = () => {
        setAgregarLibro(!setAgregarLibro)
        setEnviado(!enviado);
    };



    return (
        <>
            <div className="modal">
                <div className="formulario_persona modal-content">
                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle">Add Book</h4>

                    <div className="form-wrapper"> 

                    <div className="form-item" >
                        <label >Name</label>
                        <input type="text" value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
                    </div>
                    <div  className="form-item">
                        <label >Description</label>
                        <input type="text" value={form.descripcion} onChange={handleDescripcionChange} placeholder="Descripcion" />
                    </div>
                    <div className="form-item" >
                        <label >Category</label>
                        <select className="form-item" value={props.categoria_id} onChange={handleCategoriaChange}>

                            <option value="" disabled selected hidden>Select Category</option>

                            {categoria.map((categoria) => <option value={categoria.id} key={categoria.id}    >{categoria.nombre} </option>)}
                        </select>
                    </div>
                    <div  className="form-item">
                        <label >User to lend</label>
                        <select className="form-item" value={props.persona_id} onChange={handlePersonaChange} >
                            <option value="" disabled selected hidden>Select User</option>
                            <option value=""  > not taken</option>
                            {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.nombre} </option>)}
                        </select>

                    </div>
                        <div className="form-button">  

                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCerrar}>Cancel</button>
                        </div>
                    <p>   {errorMessage} </p>
                    <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                        <div className="modal-content">

                            <h2>Book added succesfully!</h2>
                            <button onClick={handleCerrarFormEnviado} >Close</button>
                        </div>

                    </div>



                </div>
                </div>
            </div>
        </>
    )
}



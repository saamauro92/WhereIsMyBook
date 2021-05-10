import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';




export default function EditarCategoria(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [enviado, setEnviado] = useState(false);
    const IDAMODIFICAR = props.id;
    const setModal = props.setModal;
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: ''
    });




    const buscarCategoriaPorId = async (idCategoria) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/categoria/' + idCategoria)
            setForm(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!IDAMODIFICAR) return;
        buscarCategoriaPorId(IDAMODIFICAR)
    }, [IDAMODIFICAR])

    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };

    const handleCerrar = () => {
        setModal(!setModal)

    };

    const handleCerrarFormEnviado = () => {
        setModal(!setModal)
        setEnviado(!enviado);
    };

    const validateForm = () => {
        if (!form.nombre) {
            return { validation: false, errorMessage: "*Field cannot be empty" };
        } else {
            return { validation: true, errorMessage: "" };

        }
    }


    const onSave = async (idAModificar) => {
        let formValidation = validateForm();
        if (!formValidation.validation) {
            setErrorMessage(formValidation.errorMessage);
        } else {
            let respuesta
            try {

                console.log(form)
                respuesta = await axios.put('http://localhost:3000/categoria/' + idAModificar, form);
                dispatch({ type: 'MODIFICAR_UNA_CATEGORIA', idCategoriaAModificar: respuesta.data });
                setEnviado(!enviado);
                console.log(form)

            } catch (e) {

            }
        }


    }




    return (
        <>
            <div className="modal">
                <div className="formulario_persona modal-content">
                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle"> Edit Category</h4>

                    <div className="form-wrapper">
                        <div className="form-item">
                            <label >Name</label>
                            <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                        </div>
                        <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                            <div className="modal-content">

                                <h2>Category edited succesfully!</h2>
                                <button onClick={handleCerrarFormEnviado} >Close</button>

                            </div>


                        </div>
                        <div className="form-button">

                            <button onClick={() => onSave(props.id)}> Save</button>

                            <button onClick={handleCerrar}>Cancel</button>
                            <p>   {errorMessage}  </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



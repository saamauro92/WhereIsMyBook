import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';




export default function EditarLibro(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();
    const [form, setForm] = useState({
        descripcion: '',

    });
    const [enviado, setEnviado] = useState(false);
    const IDAMODIFICAR = props.id;
    const setModal = props.setModal;




    const buscarLibroPorId = async (idLibro) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/libro/' + idLibro)
            setForm(respuesta.data)


        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!IDAMODIFICAR) return;
        buscarLibroPorId(IDAMODIFICAR)
    }, [IDAMODIFICAR])

    const handleDescriptionChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
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
        if (!form.descripcion) {
            return { validation: false, errorMessage: "*Please fill in the field" };
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
                if (form) {
                    delete form.nombre;
                    delete form.categoria_id;
                    delete form.persona_id;
                    respuesta = await axios.put('http://localhost:3000/libro/' + idAModificar, form);
                    dispatch({ type: 'MODIFICAR_UN_LIBRO', idLibroAModificar: respuesta.data });
                    setEnviado(!enviado);
                    console.log(form)
                }

                props.history.push('/libro');

            } catch (e) {

            }

        }



    }



    return (
        <>
            <div className="modal">
                <div className="formulario_persona modal-content">

                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle">Edit Book</h4>

                    <div className="form-wrapper">
                        <div className="form-item">
                            <label > Book Description</label>
                            <input type="text" name="descripcion" value={form.descripcion} onChange={handleDescriptionChange} />
                        </div>


                        <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                            <div className="modal-content">

                             <h2>Book edited succesfully!</h2>
                                <button onClick={handleCerrarFormEnviado} >Close</button>
                            </div>

                        </div>

                        <div className="form-button">

                            <button onClick={() => onSave(props.id)}> Save</button>

                            <button onClick={handleCerrar}>Cancel</button>
                        </div>
                        <p>   {errorMessage} </p>
                    </div>

                </div>
            </div>
        </>
    )
}



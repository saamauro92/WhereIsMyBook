import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



export default function EditarLibro(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const params = useParams();
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
            return { validation: false, errorMessage: "*El campo no puede quedar vacio. Por Favor completar" };
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
                    const respuesta = await axios.put('http://localhost:3000/libro/' + idAModificar, form);
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
                    <h4>Editar Libro</h4>
                    <div>
                        <label >Descripcion del libro</label>
                        <input type="text" name="descripcion" value={form.descripcion} onChange={handleDescriptionChange} />
                    </div>


                    <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                        <div className="modal-content">

                            <h2>Libro editado con exito!</h2>
                            <button onClick={handleCerrarFormEnviado} >cerrar</button>
                        </div>

                    </div>


                    <button onClick={() => onSave(props.id)}> Guardar</button>

                    <button onClick={handleCerrar}>Cancelar</button>
                    <p>   {errorMessage} </p>
                </div>

            </div>
        </>
    )
}



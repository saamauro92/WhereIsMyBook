import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';




export default function EditarPersona(props) {


    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        alias: ''

    });


    const setModal = props.setModal;
    const [errorMessage, setErrorMessage] = useState("");

    const [enviado, setEnviado] = useState(false);


    const IDAMODIFICAR = props.id;

    const buscarPersonaPorId = async (idPersona) => {
        try {
            const respuesta = await axios.get('http://localhost:3000/persona/' + idPersona)
            setForm(respuesta.data)

        } catch (e) {

        }
    }

    React.useEffect(() => {
        if (!IDAMODIFICAR) return;
        buscarPersonaPorId(IDAMODIFICAR)
    }, [])

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




    const handleUsernameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.alias = e.target.value;
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
        if (!form.nombre || !form.apellido || !form.alias) {
            return { validation: false, errorMessage: "*Please complete all required fields" };
        } else {
            return { validation: true, errorMessage: "" };

        }
    }





    const onSave = async (idAmodificar) => {
        let formValidation = validateForm();
        if (!formValidation.validation) {
            setErrorMessage(formValidation.errorMessage);
        } else {
            let respuesta




            try {
                if (form) {

                    delete form.email;
                    respuesta = await axios.put('http://localhost:3000/persona/' + idAmodificar, form);
                    dispatch({ type: 'MODIFICAR_UNA_PERSONA', idPersonaAModificar: respuesta.data });

                    setEnviado(!enviado);
                    console.log(form)

                }

                props.history.push('/persona');


            } catch (e) {
                console.log("error en el servidor")



            }



        }

    }







    return (
        <>

            <div className="modal">
                <div className="formulario_persona modal-content ">
                    <span onClick={handleCerrar} className="close"> x</span>
                    <h4 className="form-tittle">Edit User</h4>

                    <div className="form-wrapper">
                        <div className="form-item ">
                            <label >Name</label>
                            <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />

                        </div>
                        <div className="form-item ">
                            <label >Surname</label>
                            <input type="text" name="apellido" value={form.apellido} onChange={handleSurnameChange} />

                        </div>
                        <div className="form-item ">
                            <label >Email</label>
                            <input type="text" name="email" placeholder={form.email} />
                        </div>
                        <div className="form-item ">
                            <label >Username</label>
                            <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                            <p>   {errorMessage} </p>

                        </div>


                        <div className={enviado ? "modalSucces" : "modalSucces-no"}>
                            <div className="modal-content">

                                <h2>User edited sucessfully!</h2>
                                <button onClick={handleCerrarFormEnviado} >Close</button>
                            </div>

                        </div>
                        <div className="form-button">

                            <button onClick={() => onSave(props.id)}> Save</button>

                            <button onClick={handleCerrar}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



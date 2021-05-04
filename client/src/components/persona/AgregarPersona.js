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
             return {validation: false, errorMessage: "*Faltan datos. Por favor completar todos los campos."};   
            } else { return {validation: true, errorMessage:""};
       
         }  
          }


    const onSave = async () => {
        let formValidation = validateForm();
        if(!formValidation.validation){
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
            <h4> Agregar Persona</h4>


                <div>
                    <label >Nombre</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                </div>
                <div >
                    <label >Apellido</label>
                    <input type="text" name="apellido" value={form.apellido} onChange={handleSurnameChange} />
                </div>
                <div >
                    <label >Email</label>
                    <input type="text" name="email" value={form.email} onChange={handleEmailChange} />
                </div>
                <div >
                    <label >Alias</label>
                    <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                </div>
            
                <button type="submit" onClick={onSave}> Guardar</button>
                <button onClick={handleCerrar}>Cancelar</button>
                <p>   {errorMessage} </p>   
                <div className={enviado ? "modalSucces": "modalSucces-no"}>
    <div className="modal-content">

    <h2>Persona agregada con exito!</h2>
    <button onClick={handleCerrarFormEnviado} >cerrar</button>
    </div>
 
</div>


            </div>
            </div>
        </>
    )
}



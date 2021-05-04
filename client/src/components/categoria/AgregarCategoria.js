import React, { useState } from 'react'
import axios from "axios";
import { useDispatch} from 'react-redux';





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
             return {validation: false, errorMessage: "*El campo no puede quedar vacio"};   
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
                <h4>Agregar Categoria</h4>



                <div>
                    <label >Nombre</label>
                    <input type="text" name="nombre" value={form.nombre} onChange={handleNameChange} />
                </div>
                
                <button type="submit" onClick={onSave}> Guardar</button>
                <button onClick={handleCerrar}>Cancelar</button>
                <p>   {errorMessage} </p>  
                <div className={enviado ? "modalSucces": "modalSucces-no"}>
    <div className="modal-content">

    <h2>Categoria agregada con exito!</h2>
    <button onClick={handleCerrarFormEnviado} >cerrar</button>
    </div>
 
</div>

            </div>
            </div>

        </>
    )
}



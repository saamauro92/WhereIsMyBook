import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';



export default function EditarPersona(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        alias: ''

    });
 

    const setModal = props.setModal;
    const [errorMessage, setErrorMessage] = useState("");
    const [validation, setValidation] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const handleCancel = () => {
        props.history.push('/persona');
    };

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
       if (!form.nombre || !form.apellido || !form.alias ) {
            return {validation: false, errorMessage: "*Faltan datos. Por favor completar todos los campos."};   
           } else { return {validation: true, errorMessage:""};
      
        }  
         }


    

  
    const onSave = async (idAmodificar) => {
        let formValidation = validateForm();
        if(!formValidation.validation){
            setErrorMessage(formValidation.errorMessage);
        } else {
            let respuesta
     
      

     
        try {
            if(form){  
              
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
                <h4>Editar Persona</h4>


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
                    <input type="text" name="email" placeholder={form.email} />
                </div>
                <div >
                    <label >Alias</label>
                    <input type="text" name="alias" value={form.alias} onChange={handleUsernameChange} />
                    <p>   {errorMessage} </p>   

                </div>
            

<div className={enviado ? "modalSucces": "modalSucces-no"}>
    <div className="modal-content">

    <h2>Persona editada con exito!</h2>
    <button onClick={handleCerrarFormEnviado} >cerrar</button>
    </div>
 
</div>
    
                <button onClick={()=>onSave(props.id)}> Guardar</button>

                <button onClick={handleCerrar}>Cancelar</button>
            </div>
            </div>
        </>
    )
}



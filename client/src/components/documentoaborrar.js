import axios from 'axios';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
/* 
const unaPersona = (persona) => {
    const [PersonaSelecionada, setPersonaSelecionada] = useState(0);
    return (
        <div  key={persona.id}>

        </div>
    )
} */


export default function Persona(props) {

    

    const dispatch = useDispatch();

    const listadoPersonas = useSelector((state) => state.persona);

    const [textoEditable, setTextoEditable] = useState(false);
    const [toggled, setToggled] = useState(true);



    const [form, setForm] = useState({
        nombre: '',
        apellido: '',

    });

    console.log(form);

    const editarFondo = () => {

        setToggled(!toggled)
        setTextoEditable(true)
    }



    const handleBorrarPersona = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/persona/${idABorrar}`);
            dispatch({ type: 'REMOVER_PERSONA', idPersonaARemover: idABorrar });
            props.history.push('/persona');
        } catch (e) {
            console.log("error en el servidor")
        }

    }


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

    const SaveChange= async () => {
        try {
            const respuesta = await axios.put(`http://localhost:3000/persona`, form);
            dispatch({ type: 'MODIFICAR_UNA_PERSONA', storeModificarPersona: respuesta.data }); 
            props.history.push('/persona');
        } catch (e) {
            console.log('problema con el servidor')
        }
    };






    return (

        <div>
            <h2> Persona</h2>

            <Link to="/persona/agregar"> <h3> +Agregar Persona(tooltip)</h3> </Link>


            <div className="container">

                {listadoPersonas.map((persona) =>

                    <div key={persona.id} className={toggled ? "card" : "card_selected"}>
                        <ul>
                            <li > {persona.id} </li>
                            <input type="text" className={toggled ? "boton_editar" : "boton_editar_visible"} value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
                          <input type="text"className={toggled ? "boton_editar" : "boton_editar_visible"} value={form.apellido} onChange={handleSurnameChange} placeholder="Apellido" />
                            <li value={form.nombre} className={toggled ? "boton_editar_visible" : "boton_editar"} contentEditable={textoEditable} onChange={handleNameChange}> {persona.nombre} </li>
                            <li value={form.apellido} className={toggled ? "boton_editar_visible" : "boton_editar"} contentEditable={textoEditable} onChange={handleSurnameChange} >{persona.apellido} </li>
                            <li contentEditable={textoEditable} >{persona.email} </li>
                            <li contentEditable={textoEditable}>{persona.alias} </li> 
                        </ul>

                        <div className="card_bottom">

                            <h6>libro</h6>
                            <h6 onClick={editarFondo}>editar</h6>
                            <h6 onClick={() => handleBorrarPersona(persona.id)}>eliminar</h6>

                            <div className={toggled ? "boton_editar" : "boton_editar_visible"}
                            >
                                <button onClick={SaveChange} > GUARDAR</button>

                            </div>
                        </div>

                    </div>

                )}

            </div>





        </div>
    )
}
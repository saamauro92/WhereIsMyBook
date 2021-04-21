import axios from 'axios';
import react from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Persona(props) {

    const dispatch = useDispatch();

    const listadoPersonas = useSelector((state) => state.persona);

    const [textoEditable, setTextoEditable] = react.useState(false);
    const [toggled, setToggled] = react.useState(true);


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







    return (

        <div>
            <h2> Persona</h2>

            <Link to="/persona/agregar"> <h3> +Agregar Persona(tooltip)</h3> </Link>


            <div className="container">

                {listadoPersonas.map((persona) =>

                    <div key={persona.id} className={toggled ? "card" : "card_selected"}>
                        <ul>
                            <li > {persona.id} </li>
                            <li contentEditable={textoEditable}> {persona.nombre} </li>
                            <li contentEditable={textoEditable}>{persona.apellido} </li>
                            <li contentEditable={textoEditable} >{persona.email} </li>
                            <li contentEditable={textoEditable}>{persona.alias} </li>
                        </ul>

                        <div className="card_bottom">

                            <h6>libro</h6>
                            <h6 onClick={editarFondo}>editar</h6>
                            <h6 onClick={() => handleBorrarPersona(persona.id)}>eliminar</h6>

                            <div className={toggled ? "boton_editar" : "boton_editar_visible"}
                            >
                                <button  > GUARDAR</button>

                            </div>
                        </div>

                    </div>

                )}

            </div>





        </div>
    )
}
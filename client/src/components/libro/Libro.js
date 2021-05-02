import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import PrestarLibro from './PrestarLibro';
import axios from "axios";
import { useParams } from 'react-router-dom';
function UnLibro(props) {

    const [toggle, setToggle] = useState(true);
    const [devolver, setDevolver] = React.useState({
        id: "",
        persona_id: ""
    })
    const dispatch = useDispatch();
    const params = useParams();

    const handleLibro = (idPersona) => {

        setToggle(false);

    }

    const handleBorrarLibro = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/libro/${idABorrar}`);
            dispatch({ type: 'REMOVER_LIBRO', idLibroARemover: idABorrar });
            props.history.push('/persona');

        } catch (e) {

            console.log("error en el servidor")
        }

    }


    const handleDevolver = async (idADevolver) => {

        try {
            setDevolver(idADevolver)
            const respuesta = await axios.put('http://localhost:3000/libro/devolver/' + idADevolver, devolver);
            dispatch({ type: 'DEVOLVER_LIBRO', idLibroADevolver: idADevolver });
            console.log(respuesta)
            props.history.push('/libro');


        } catch (e) {

        }

    }

    return (
        <>

            <div id={props.id} >

                <div className="listado_contenedor">
                    <div className="lista">

                        <div className="lista_id">
                            {props.id}
                        </div>

                        <div className="lista_nombre">
                            {props.nombre}
                        </div>
                        <div className="lista_apellido">
                            {props.descripcion}
                        </div>

                        <div className="lista_editar">
                            <Link to={"/libro/editar/" + props.id}> Editar</Link>
                        </div>
                        <div className="lista_editar">
                            <Link onClick={() => handleBorrarLibro(props.id)}> Borrar</Link>
                        </div>


                        <div className="lista_editar">
                            <Link onClick={() => handleLibro(props.id)} > Prestado a</Link>
                            <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                                {props.alias}
                            </div>

                        </div>


                        <div className="lista_editar">
                            <Link to onClick={() => handleDevolver(props.id)}>Devolver </Link>

                        </div>
                        <div>

                        <div className="lista_editar">
                            <Link /* to onClick={() => handleDevolver(props.id)} */>Prestar a </Link>

                        <PrestarLibro id={props.id}/>
                        </div>

                        </div>



                    </div>
                </div>


            </div>





        </>
    )
}



export default function Libro(props) {

    const dispatch = useDispatch();
    const listadoDeLibros = useSelector((state) => state.libro);
    const listadoPersonas = useSelector((state) => state.persona);

    const datosJuntos = listadoDeLibros.map(libroB => {
        const personaAlias = listadoPersonas.find(personaB => personaB.id == libroB.persona_id)
        return { id: libroB.id, nombre: libroB.nombre, descripcion: libroB.descripcion, categoria: libroB.categoria_id, alias: libroB.alias, aliasPersona: personaAlias ? personaAlias.alias : "No esta prestado" }

    })





    return (
        <>

            <div>

                <h2>Libro</h2>
                <Link to="/libro/agregar">  <h3>+ agregar libro</h3> </Link>

                {
                    datosJuntos.map((libro, index) => <UnLibro key={index} id={libro.id} nombre={libro.nombre} descripcion={libro.descripcion} categoria={libro.categoria_id} alias={libro.aliasPersona} persona_id={libro.persona_id} />)
                }


            </div>


        </>
    )
}

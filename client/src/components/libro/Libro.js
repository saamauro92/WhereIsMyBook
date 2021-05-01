import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';


function UnLibro(props) {

    const [toggle, setToggle] = useState(true);


    const handleLibro = (idPersona) => {

        setToggle(false);


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
                            <Link to={"/persona/editar/" + props.id}> Editar</Link>
                        </div>
                        <div className="lista_editar">
                            <Link /* onClick={() => handleBorrarPersona(props.id)} */> Borrar</Link>
                        </div>


                        <div className="lista_editar">
                            <Link onClick={() => handleLibro(props.id)} > Prestado a</Link>


                        </div>
                        <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                            {props.alias}
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

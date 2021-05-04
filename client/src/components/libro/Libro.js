import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PrestarLibro from './PrestarLibro';
import axios from "axios";
import EditarLibro from './EditarLibro';
import AgregarLibro from './AgregarLibro';

function UnLibro(props) {
    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [devolver, setDevolver] = React.useState({
        id: "",
        persona_id: ""
    })
    const dispatch = useDispatch();


    const handleLibro = (idPersona) => {

        setToggle(!toggle);

    }

    const handleEditarLibro = (id) => {

        setModal(!modal);

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
                    

                            <button onClick={() => handleEditarLibro(props.id)}> EDITAR</button>
                           { modal &&    <EditarLibro id={props.id} setModal={setModal} modal={modal} />}


                        </div>
                        <div className="lista_editar">
                            <button onClick={() => handleBorrarLibro(props.id)}> Borrar</button>
                        </div>


                        <div className="lista_editar">
                            <button onClick={() => handleLibro(props.id)} > Prestado a</button>
                            <div className={ toggle ? "mostrar-libro-no" :  "mostrar-libro-si"}>
                                {props.alias}
                            </div>

                        </div>


                        <div className="lista_editar">
                            <button to onClick={() => handleDevolver(props.id)}>Devolver </button>

                        </div>
                        <div>

                        <div className="lista_editar">

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
    const [agregarLibro, setAgregarLibro] = useState(false)
    const listadoDeLibros = useSelector((state) => state.libro);
    const listadoPersonas = useSelector((state) => state.persona);

    const handleAdLibro = (id) => {

        setAgregarLibro(!agregarLibro);

    }

    const datosJuntos = listadoDeLibros.map(libroB => {
        const personaAlias = listadoPersonas.find(personaB => personaB.id == libroB.persona_id)
        return { id: libroB.id, nombre: libroB.nombre, descripcion: libroB.descripcion, categoria: libroB.categoria_id, alias: libroB.alias, aliasPersona: personaAlias ? personaAlias.alias : "No esta prestado" }

    })





    return (
        <>

            <div>

                <h2>Libro</h2>
                <button onClick={() => handleAdLibro(props.id)}> +Agregar Libro</button>
                           { agregarLibro &&    <AgregarLibro id={props.id} agregarLibro={agregarLibro} setAgregarLibro={setAgregarLibro} />}
              
                {
                    datosJuntos.map((libro, index) => <UnLibro key={index} id={libro.id} nombre={libro.nombre} descripcion={libro.descripcion} categoria={libro.categoria_id} alias={libro.aliasPersona} persona_id={libro.persona_id} />)
                }


            </div>


        </>
    )
}

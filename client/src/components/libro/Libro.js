import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PrestarLibro from './PrestarLibro';
import axios from "axios";
import EditarLibro from './EditarLibro';
import AgregarLibro from './AgregarLibro';

function UnLibro(props) {


    /* borrar states */
    const [abrirModalBorrarSuccess, setAbrirModalBorrarSuccess] = useState(false);
    const [abrirModalBorrarFailed, setAbrirModalBorrarFailed] = useState(false);
    const [succesMessageBorrar, setSuccesMessageBorrar] = useState("")
    /* devolver states */
    const [abrirModalPrestarSuccess, setAbrirModalPrestarSuccess] = useState(false);
    const [abrirModalPrestarFailed, setAbrirModalPrestarFailed] = useState(false);
    const [succesMessageDevolver, setSuccesMessageDevolver] = useState("")


    const [libroPrestado, setLibroPrestado] = useState("")
    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(true);

    const [devolver, setDevolver] = React.useState({
        id: "",
        persona_id: ""
    })


    const dispatch = useDispatch();

    const handleLibro = (idPersona) => { setToggle(!toggle) }
    const handleEditarLibro = (id) => { setModal(!modal) }




    const handleBorrarLibro = async (idABorrar) => {

        try {
            await axios.delete(`http://localhost:3000/libro/${idABorrar}`)
            dispatch({ type: 'REMOVER_LIBRO', idLibroARemover: idABorrar });
            setAbrirModalBorrarSuccess(!abrirModalBorrarSuccess);
            setSuccesMessageBorrar("Book deleted!")

        } catch (e) {
            try {
                setAbrirModalBorrarFailed(!abrirModalBorrarFailed)
                setLibroPrestado(e.response.data.mensaje)

            } catch (e2) {
                setAbrirModalBorrarFailed(!abrirModalBorrarFailed)
                setLibroPrestado(e.message)

            }

        }

    }


    const handleDevolver = async (idADevolver) => {

        try {
            setDevolver(idADevolver)
            const respuesta = await axios.put('http://localhost:3000/libro/devolver/' + idADevolver, devolver);
            dispatch({ type: 'DEVOLVER_LIBRO', idLibroADevolver: idADevolver });
            console.log(respuesta)
            setAbrirModalPrestarSuccess(!abrirModalPrestarSuccess);
            setSuccesMessageDevolver("Book returned!")

        } catch (e) {
            try {
                setAbrirModalPrestarFailed(!abrirModalPrestarFailed)
                setLibroPrestado(e.response.data.mensaje)

            } catch (e2) {
                setAbrirModalPrestarFailed(!abrirModalPrestarFailed)
                setLibroPrestado(e.message)

            }

        }

    }

    return (
        <>

            <div className="card" id={props.id} >

                <div className="listado_contenedor">
                    <div className="lista">

                        <div className="card-header">

                            <p> id: {props.id} </p>
                        </div>
                        <div className="card-content">

                            <div className="lista_nombre">
                                <p className="card-p ">    {props.nombre} </p>
                            </div>
                            <div className="lista_apellido">
                                <p className="card-p ">    {props.descripcion}</p>
                            </div>

                            <div className="card-botones-libro ">
                                <div className="lista_editar">
                                    {/*            EDITAR  */}

                                    <button onClick={() => handleEditarLibro(props.id)}> Edit</button>
                                    {modal && <EditarLibro id={props.id} setModal={setModal} modal={modal} />}


                                </div>
                                {/*             BORRAR  */}
                                <div className="lista_editar">
                                    <button onClick={() => handleBorrarLibro(props.id)}> Delete</button>

                                    <div className={abrirModalBorrarSuccess ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p> {succesMessageBorrar} </p>

                                            <button onClick={() => setAbrirModalBorrarSuccess(!abrirModalBorrarSuccess)} >Close</button>
                                        </div>
                                    </div>

                                    <div className={abrirModalBorrarFailed ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p>  - {props.id} -{props.nombre} {"error proveniente del server- no se puede borrar" && libroPrestado}</p>

                                            <button onClick={() => setAbrirModalBorrarFailed(!abrirModalBorrarFailed)}  >Close</button>
                                        </div>
                                    </div>


                                </div>
                                {/*             PRESTADO A */}

                                <div className="lista_editar">
                                    <button onClick={() => handleLibro(props.id)} > Borrowed to:</button>
                                    <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                                        <p>  {props.alias} </p>
                                    </div>

                                </div>


                                <div className="lista_editar">
                                    {/*             DEVOLVER LIBRO */}
                                    <button to onClick={() => handleDevolver(props.id)}>Return </button>

                                    <div className={abrirModalPrestarSuccess ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p> ({props.id}-{props.nombre}) -{succesMessageDevolver} </p>

                                            <button onClick={() => setAbrirModalPrestarSuccess(!abrirModalPrestarSuccess)} >Close</button>
                                        </div>
                                    </div>



                                    <div className={abrirModalPrestarFailed ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p>  ({props.id}-{props.nombre}) - {"error from server, cannot return" && libroPrestado} </p>

                                            <button onClick={() => setAbrirModalPrestarFailed(!abrirModalPrestarFailed)} >Close</button>
                                        </div>

                                    </div>
                                </div>
                                <div>

                                    <div className="lista_editar">

                                        <PrestarLibro id={props.id} />
                                    </div>
                                </div>
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
        return { id: libroB.id, nombre: libroB.nombre, descripcion: libroB.descripcion, categoria: libroB.categoria_id, alias: libroB.alias, aliasPersona: personaAlias ? personaAlias.alias : "This book is not taken" }

    })





    return (
        <>

            <div>

                <h2 className="personaTitle">Books</h2>
                <button className="addPersona" onClick={() => handleAdLibro(props.id)}> +Add Book</button>

                <div className="container">
                    {agregarLibro && <AgregarLibro id={props.id} agregarLibro={agregarLibro} setAgregarLibro={setAgregarLibro} />}

                    {
                        datosJuntos.map((libro, index) => <UnLibro key={index} id={libro.id} nombre={libro.nombre} descripcion={libro.descripcion} categoria={libro.categoria_id} alias={libro.aliasPersona} persona_id={libro.persona_id} />)}

                </div>
            </div>


        </>
    )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EditarCategoria from './EditarCategoria';
import AgregarCategoria from './AgregarCategoria';

function UnaCategoria(props) {

    const [errorMessage, setErrorMessage] = useState("");
    const [succesMessage, setSuccesMessage] = useState("")
    const [abrirModalSuccess, setAbrirModalSuccess] = useState("");
    const [abrirModalFailed, setAbrirModalFailed] = useState("");
    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();


    const handleBorrarCategoria = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/categoria/${idABorrar}`);
            dispatch({ type: 'REMOVER_CATEGORIA', idGeneroARemover: idABorrar });
            setAbrirModalSuccess(!abrirModalSuccess)
            setSuccesMessage("Category deleted!")


        } catch (e) {
            try {
                setAbrirModalFailed(!abrirModalFailed)
                setErrorMessage(e.response.data.mensaje)

            } catch (e2) {
                setAbrirModalFailed(!abrirModalFailed)
                setErrorMessage(e.message)

            }

        }

    }

    const handleLibro = (idCategoria) => {
        setToggle(!toggle);


    }

    const handleEditarCategoria = (id) => {

        setModal(!modal);

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
                                <p className="card-p">{props.nombre}  </p>
                            </div>
                            <div className="card-botones">
                                <div className="lista_editar">


                                    {/* EDITAR */}    <button onClick={() => handleEditarCategoria(props.id)}> Edit</button>
                                    {modal && <EditarCategoria id={props.id} setModal={setModal} modal={modal} />}


                                </div>
                                {/* BORRAR */}                  <div className="lista_editar">
                                    <button onClick={() => handleBorrarCategoria(props.id)}> Delete</button>
                                    <div className={abrirModalSuccess ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p> {succesMessage} </p>

                                            <button onClick={() => setAbrirModalSuccess(!abrirModalSuccess)} >Close</button>
                                        </div>
                                    </div>

                                    <div className={abrirModalFailed ? "modalSucces" : "modalSucces-no"}>
                                        <div className="modal-content">
                                            <p>  - {props.id} -{props.nombre} {props.apellido}:  {"error from server- " && errorMessage}</p>

                                            <button onClick={() => setAbrirModalFailed(!abrirModalFailed)}  >Close</button>
                                        </div>
                                    </div>
                                </div>


                                {/* LIBROS */}       <div className="lista_editar">
                                    <button onClick={() => handleLibro(props.id)}> Books</button>

                                    <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                                        {props.libro}
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





export default function Categoria(props) {
    const [agregarCategoria, setAgregarCategoria] = useState(false)
    const listadoCategorias = useSelector((state) => state.categoria);
    const listadoDeLibros = useSelector((state) => state.libro);


    const handleAdCategoria = (id) => {

        setAgregarCategoria(!agregarCategoria);

    }

    const datosJuntos = listadoCategorias.map(categoriaB => {
        const libro = listadoDeLibros.find(libroB => libroB.categoria_id === categoriaB.id)
        return { id: categoriaB.id, nombre: categoriaB.nombre, nombreLibro: libro ? libro.nombre : "No books in this category" }

    })


    return (
        <>
            <div>
                <h2 className="personaTitle">Category</h2>

                <button className="addPersona" onClick={() => handleAdCategoria(props.id)}> +Add Category</button>
                <div className="container">

                    {agregarCategoria && <AgregarCategoria id={props.id} agregarCategoria={agregarCategoria} setAgregarCategoria={setAgregarCategoria} />}

                    {
                        datosJuntos.map((categoria, index) => <UnaCategoria key={index} id={categoria.id} render={true} nombre={categoria.nombre} libro={categoria.nombreLibro} />)
                    }

                </div>
            </div>

        </>
    )
}



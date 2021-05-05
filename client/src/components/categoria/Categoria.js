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
            setSuccesMessage("Categoria borrada con exito!")
      
      
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

            <div id={props.id} >

                <div className="listado_contenedor">
                    <div className="lista">

                        <div className="lista_id">
                            {props.id}
                        </div>

                        <div className="lista_nombre">
                            {props.nombre}
                        </div>                        
                        <div className="lista_editar">

      {/* EDITAR */}    <button onClick={() => handleEditarCategoria(props.id)}> EDITAR</button>
                           { modal &&    <EditarCategoria id={props.id} setModal={setModal} modal={modal} />}


                        </div>
      {/* BORRAR */}                  <div className="lista_editar">
                            <button onClick={() => handleBorrarCategoria(props.id)}> Borrar</button>
                            <div className={abrirModalSuccess ? "modalSucces" : "modalSucces-no"}>
                                <div className="modal-content">
                                    <p> {succesMessage} </p>

                                    <button onClick={() => setAbrirModalSuccess(!abrirModalSuccess)} >cerrar</button>
                                </div>
                            </div>

                            <div className={abrirModalFailed ? "modalSucces" : "modalSucces-no"}>
                                <div className="modal-content">
                                    <p>  - {props.id} -{props.nombre} {props.apellido}:  {"error proveniente del server- " && errorMessage}</p>

                                    <button onClick={()=> setAbrirModalFailed(!abrirModalFailed)}  >cerrar</button>
                                </div>
                            </div>
                        </div>


     {/* LIBROS */}       <div className="lista_editar">
                            <button onClick={() => handleLibro(props.id)}> Libros</button>

                            <div className={toggle ? "mostrar-libro-no" : "mostrar-libro-si"}>
                            {props.libro}
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
        return { id: categoriaB.id, nombre: categoriaB.nombre, nombreLibro: libro ? libro.nombre : "No Posee libro" }

    })


    return (
        <>
            <div>
                <h2>Categoria</h2>

                <button onClick={() => handleAdCategoria(props.id)}> +Agregar Categoria</button>
                           { agregarCategoria &&    <AgregarCategoria id={props.id} agregarCategoria={agregarCategoria} setAgregarCategoria={setAgregarCategoria} />}

                {
                    datosJuntos.map((categoria, index) => <UnaCategoria key={index} id={categoria.id} render={true} nombre={categoria.nombre} libro={categoria.nombreLibro} />)
                }


            </div>

        </>
    )
}



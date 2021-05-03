import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import axios from 'axios';

function UnaCategoria(props) {
    const [toggle, setToggle] = useState(true);
    const dispatch = useDispatch();
    const handleBorrarCategoria = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/categoria/${idABorrar}`);
            dispatch({ type: 'REMOVER_CATEGORIA', idGeneroARemover: idABorrar });
            props.history.push('/categoria');
        } catch (e) {
            console.log("error en el servidor")
        }

    }

    const handleLibro = (idCategoria) => {
        setToggle(!toggle);


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
                            <Link to={"/categoria/editar/" + props.id}> Editar</Link>
                        </div>
                        <div className="lista_editar">
                            <Link onClick={() => handleBorrarCategoria(props.id)}> Borrar</Link>
                        </div>


                        <div className="lista_editar">
                            <Link onClick={() => handleLibro(props.id)}> Libro</Link>

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

    const listadoCategorias = useSelector((state) => state.categoria);
    const listadoDeLibros = useSelector((state) => state.libro);

    const datosJuntos = listadoCategorias.map(categoriaB => {
        const libro = listadoDeLibros.find(libroB => libroB.categoria_id == categoriaB.id)
        return { id: categoriaB.id, nombre: categoriaB.nombre, nombreLibro: libro ? libro.nombre : "No Posee libro" }

    })


    return (
        <>
            <div>
                <h2>Categoria</h2>

                <Link to="/categoria/agregar">  <h3>+ agregar categoria</h3> </Link>

                {
                    datosJuntos.map((categoria, index) => <UnaCategoria key={index} id={categoria.id} render={true} nombre={categoria.nombre} libro={categoria.nombreLibro} />)
                }


            </div>

        </>
    )
}



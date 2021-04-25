import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'


function UnLibro(props) {
    const [toggled, setToggled] = useState(true);
    const dispatch = useDispatch();
    const handleBorrarLibro = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/libro/${idABorrar}`);
            dispatch({ type: 'REMOVER_LIBRO', idLibroARemover: idABorrar });
            props.history.push('/libro');
        } catch (e) {
            console.log("error en el servidor")
        }

    }


    const editarFondo = () => {
        setToggled(!toggled)
    }




    return (
        <div>
            <div key={props.id} className="container">

                <div className={toggled ? "card-libro" : "card-libro_selected "}>

                    <h3> {props.nombre}</h3>
                    <p> Descripcion: <br />{props.descripcion}</p>
                    <h4> <p>Prestado a: </p>{props.alias}</h4>
                    <div>

                        <h6>prestar/devolver</h6>
                        <h6 onClick={editarFondo}>editar</h6>
                        <h6 onClick={() => handleBorrarLibro(props.id)} >eliminar</h6>

                    </div>
                </div>
            </div>



        </div>

    )
}


export default function Libro(props) {


    const dispatch = useDispatch();
    const listadoDeLibros = useSelector((state) => state.libro);
    const idPersonaPrestada = useSelector((state) => state.personaPrestada);

    React.useEffect(async () => {
        const respuesta = await axios.get('http://localhost:3000/libro');
        dispatch({ type: 'VER_LIBROS', storeActionLibros: respuesta.data });

    }, []);


    React.useEffect(async () => {
        // verifico a quien se presto el libro (request nueva creada en backend)
        const respuesta = await axios.get('http://localhost:3000/libro/prestado');
        dispatch({ type: 'PRESTADO_A', idPersonaPrestada: respuesta.data });
    }, []);

    // filtro el listado de libros sacando los que estan prestados
    const listadoDeLibrosNuevo = listadoDeLibros.filter(function (libro) { if (libro.persona_id < 1) { return libro } })
    //Junto los no prestados con prestados
    const assign = Object.assign(listadoDeLibrosNuevo, idPersonaPrestada);


    return (

        <div >

            <h2>Libro</h2>
            <Link to="/libro/agregar"> <h3> +Agregar libro(tooltip)</h3> </Link>

            { assign.map((libro, i) => <UnLibro key={i} id={libro.id} nombre={libro.nombre} alias={libro.alias} descripcion={libro.descripcion} categoria={libro.categoria_id} persona_id={libro.persona_id} />)}


        </div>
    )
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'


function UnLibro(props) {




    return (
        <div>
            <div className="container">

                <div className="card-libro">
                    <p>{props.id}</p>
                    <h3> {props.nombre}</h3>
                    <p> Descripcion: <br />{props.descripcion}</p>
                    <h4> <p>Prestado a: </p>{props.alias}</h4>

                    <div>

                        <h6>prestar/devolver</h6>
                        <h6 >editar</h6>
                        <h6 >eliminar</h6>


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

    //Junto los dos objetos para crear uno solo con el alias de la persona prestada
    const assign = Object.assign(listadoDeLibros, idPersonaPrestada);


    return (

        <div >

            <h2>Libro</h2>
            <Link to="/libro/agregar"> <h3> +Agregar libro(tooltip)</h3> </Link>
            {/*       {
                listadoDeLibros.map((libro) => <UnLibro key={libro.id} id={libro.id} nombre={libro.nombre} descripcion={libro.descripcion} categoria={libro.categoria_id} persona_id={libro.persona_id} />)
            } */}
            { assign.map((libro) => <UnLibro key={libro.id} id={libro.id} nombre={libro.nombre} alias={libro.alias} descripcion={libro.descripcion} categoria={libro.categoria_id} persona_id={libro.persona_id} />)}


        </div>
    )
}
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'
export default function Libro(props) {


    const dispatch = useDispatch();
    const listadoDeLibros = useSelector((state) => state.libro);
    const listadoPersonas = useSelector((state) => state.persona);
    React.useEffect(async () => {


        const respuesta = await axios.get('http://localhost:3000/libro');
        dispatch({ type: 'VER_LIBROS', storeActionLibros: respuesta.data });

    }, []);

    return (

        <div  >

            <h2>Libro</h2>
            <Link to="/libro/agregar"> <h3> +Agregar libro(tooltip)</h3> </Link>
            {
                listadoDeLibros.map((libro) => <div key={libro.id}>
                    <ul>

                        <li>  {libro.nombre} <br/> 
                              </li>


                    </ul>


                </div>)
            }


        </div>
    )
}
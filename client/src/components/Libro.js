import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function Libro(props) {


    const dispatch = useDispatch();
    const listadoDeLibros = useSelector((state) => state.libro);

    React.useEffect(async () => {


        const respuesta = await axios.get('http://localhost:3000/libro');
        dispatch({ type: 'VER_LIBROS', storeActionLibros: respuesta.data });

    }, []);

    return (

        <div  >

            <h2>Libro</h2>

            {
                listadoDeLibros.map((libro) => <div key={libro.id}>
                    <ul>

                        <li>  {libro.nombre}  </li>


                    </ul>


                </div>)
            }


        </div>
    )
}
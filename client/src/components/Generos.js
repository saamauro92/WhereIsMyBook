import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Generos() {


    const dispatch = useDispatch();
    const listadoDeCategorias = useSelector((state) => state.categoria);
    React.useEffect(async () => {


        const respuesta = await axios.get('http://localhost:3000/categoria');
        dispatch({ type: 'VER_CATEGORIA', listadoDeCategorias: respuesta.data }); 
    }, []);


    return (

        <div  >

            <h2>Generos</h2>

            <Link to="/generos/agregar"> <h3> +Agregar Genero(tooltip)</h3> </Link>


            {
                listadoDeCategorias.map((genero) => <div key={genero.id}>
                    <ul>

                        <li className="card">  {genero.nombre}  </li>


                    </ul>


                </div>)
            }

        </div>
    )
}
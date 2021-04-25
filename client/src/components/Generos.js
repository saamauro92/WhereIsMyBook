import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'


function UnGenero(props) {

    const dispatch = useDispatch();
    const handleBorrarGenero = async (idABorrar) => {

        try {

            await axios.delete(`http://localhost:3000/categoria/${idABorrar}`);
            dispatch({ type: 'REMOVER_CATEGORIA', idGeneroARemover: idABorrar });
            props.history.push('/generos');
        } catch (e) {
            console.log("error en el servidor")
        }

    }


    return (

        <div key={props.id}>

            <div className="card-genero">
                {props.nombre}
                <div>

                    <h6 >editar</h6>
                    <h6  onClick={()=> handleBorrarGenero(props.id)}>eliminar</h6>


                </div>
            </div>




        </div>
    )
}


export default function Generos() {


    const dispatch = useDispatch();
    const listadoDeCategorias = useSelector((state) => state.categoria);
    React.useEffect(async () => {

        const respuesta = await axios.get('http://localhost:3000/categoria');
        dispatch({ type: 'VER_CATEGORIA', listadoDeCategorias: respuesta.data });
    }, []);


    return (

        <div >

            <h2>Generos</h2>

            <Link to="/generos/agregar"> <h3> +Agregar Genero(tooltip)</h3> </Link>


            {
                listadoDeCategorias.map((genero) => <UnGenero key={genero.id} id={genero.id} nombre={genero.nombre} />)

            }

        </div>
    )
}
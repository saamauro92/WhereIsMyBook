import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function AgregarGenero(props) {

    const dispatch = useDispatch();
    const [form, setForm] = React.useState({
        nombre: '',

    });


    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };



    const handleCancel = () => {
        props.history.push('/generos');
    };


    const handleSave = async () => {
        try {
          const serverResponse = await axios.post(`http://localhost:3000/categoria`, form);
          dispatch({ type: 'AGREGAR_CATEGORIA', storeActionCategoria: serverResponse.data });
          props.history.push('/generos');
        } catch (e) {
          // Informar al usuario que no se pudo borrar
        }
      };


    return (

        <div>
            <h2> Agregar Genero</h2>
          

                <input type="text" value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
      

        </div>
    )
}
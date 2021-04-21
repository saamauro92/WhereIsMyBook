import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



export default function AgregarLibro(props) {
    const categorias = useSelector((state) => state.categoria);
    const listadoPersonas = useSelector((state) => state.persona);
  

    const [form, setForm] = React.useState({
        nombre: '',
        descripcion: '',
        categoria_id: "",
        persona_id: ""
    });

    const dispatch = useDispatch();
console.log(form);

    const handleNameChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.nombre = e.target.value;
        setForm(newForm);
    };


    const handleDescripcionChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.descripcion = e.target.value;
        setForm(newForm);
    };

    const handleCategoriaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.categoria_id = e.target.value;
        setForm(newForm);
    };

    const handlePersonaChange = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.persona_id = e.target.value;
        setForm(newForm);

    };


    const handleCancel = () => {
        props.history.push('/libro');
    };


    const handleSave = async () => {
        try {
            const respuesta = await axios.post(`http://localhost:3000/libro`, form);
            dispatch({ type: 'AGREGAR_LIBRO', storeActionLibro: respuesta.data });
            props.history.push('/libro');
        } catch (e) {
            console.log('problema con el servidor')
        }
    };



    return (

        <div>
            <h2> Agregar Libro</h2>



            <input type="text" value={form.nombre} onChange={handleNameChange} placeholder="Nombre" />
            <input type="text" value={form.descripcion} onChange={handleDescripcionChange} placeholder="Descripcion" />


    <select value={props.categoria_id} onChange={handleCategoriaChange}>

    <option value="" disabled selected hidden>Selecionar Categoria</option>
    
 {categorias.map((categoria) => <option value={categoria.id} key={categoria.id}    >{categoria.nombre} </option>)}
    </select>
    <br/>



            <select value={props.persona_id}  onChange={handlePersonaChange} >
            <option value="" disabled selected hidden>Selecionar Persona</option>
            <option value=""  >Sin prestar</option>
                {listadoPersonas.map((persona) => <option value={persona.id} key={persona.id}   >{persona.nombre} </option>)}
            </select>

            
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>




        </div>
    )
}
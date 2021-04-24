import { createStore } from 'redux';

const estadoInicial = {
    persona: [],
    libro: [],
    categoria: [],
    personaPrestada: [],
};



function reducer(state = estadoInicial, action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'VER_PERSONAS':
            nuevoState.persona = action.listadoPersona;
            return nuevoState;
        case 'AGREGAR_UNA_PERSONA':
            nuevoState.persona.push(action.storeActionPersona);
            return nuevoState;
        case 'MODIFICAR_UNA_PERSONA':
            nuevoState.persona = nuevoState.persona.findIndex((unaPersona) => unaPersona.id !== action.idPersonaAModificar);

            return nuevoState

        case 'REMOVER_PERSONA':
            nuevoState.persona = nuevoState.persona.filter((unaPersona) => unaPersona.id !== action.idPersonaARemover);

            return nuevoState;

        case 'VER_LIBROS':
            nuevoState.libro = action.storeActionLibros;
            return nuevoState;
        case 'AGREGAR_LIBRO':
            nuevoState.libro.push(action.storeActionLibro);
            return nuevoState;

        case 'VER_CATEGORIA':
            nuevoState.categoria = action.listadoDeCategorias;
            return nuevoState;


        case 'AGREGAR_CATEGORIA':
            nuevoState.categoria.push(action.storeActionCategoria);
            return nuevoState;
        case 'PRESTADO_A':
            nuevoState.personaPrestada = action.idPersonaPrestada;
            return nuevoState;


        default:
            return state;
    }
}


export default createStore(reducer);

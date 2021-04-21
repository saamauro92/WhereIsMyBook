import { createStore } from 'redux';

const estadoInicial = {
    persona: [],
    libro: [],
    categoria: [],
};

function reducer(state = estadoInicial, action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'VER_PERSONAS':
            nuevoState.persona = action.personaState;
            return nuevoState;
        case 'AGREGAR_UNA_PERSONA':
            nuevoState.persona.push(action.personaState);
            return nuevoState;

        case 'REMOVER_PERSONA':
            nuevoState.persona = nuevoState.filter((unaPersona) => unaPersona.id !== action.idPersonaARemover);
            return nuevoState;

        case 'VER_LIBROS':
            nuevoState.libro = action.listadoDeLibros;
            return nuevoState;

        case 'VER_CATEGORIA':
            nuevoState.categoria = action.listadoDeCategorias;
            return nuevoState;


        default:
            return state;
    }
}


export default createStore(reducer);

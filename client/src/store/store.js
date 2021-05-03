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
            nuevoState.persona = action.listadoPersona;
            return nuevoState;

        case 'AGREGAR_UNA_PERSONA':
            nuevoState.persona.push(action.storeActionPersona);
            return nuevoState;
         case 'MODIFICAR_UNA_PERSONA':
            var { id, nombre, apellido, alias } = action.idPersonaAModificar;
            const personaAModificar = nuevoState.persona.find(persona => persona.id === id)
            if (personaAModificar) {
                personaAModificar.nombre = nombre
                personaAModificar.apellido = apellido
                personaAModificar.alias = alias
            }
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
        case 'DEVOLVER_LIBRO':
            const libroID = action.idLibroADevolver;
            const personaADevolver = nuevoState.libro.find(libro => libro.id === libroID)
            if (personaADevolver) {
                personaADevolver.persona_id = ""
            }
            return nuevoState

       case 'MODIFICAR_UN_LIBRO':
            var { id, descripcion } = action.idLibroAModificar;
            const libroAModificar = nuevoState.libro.find(libro => libro.id === id)
            if (libroAModificar) {
                libroAModificar.descripcion = descripcion

            }
            return nuevoState 

        /////////////////  PRESTAR LIBRO   ////////////////////////
           case 'PRESTAR':
         var { id, nombre, descripcion, categoria_id, persona_id } = action.idAPrestar; 
             const libroAPrestar = nuevoState.libro.find(librob => librob.id === id)
             if (libroAPrestar)  {
                libroAPrestar.persona_id = persona_id;
                    }   
                    return nuevoState
                    


        case 'REMOVER_LIBRO':
            nuevoState.libro = nuevoState.libro.filter((unLibro) => unLibro.id !== action.idLibroARemover);
            return nuevoState;




        case 'VER_CATEGORIA':
            nuevoState.categoria = action.listadoDeCategorias;
            return nuevoState;
        case 'AGREGAR_UNA_CATEGORIA':
            nuevoState.categoria.push(action.storeActionCategoria);
            return nuevoState;

       case 'REMOVER_CATEGORIA':
                nuevoState.categoria = nuevoState.categoria.filter((unaCategoria) => unaCategoria.id !== action.idGeneroARemover);
                return nuevoState;
          
        case 'PRESTADO_A':
            nuevoState.personaPrestada = action.idPersonaPrestada;
            return nuevoState;

     case 'MODIFICAR_UNA_CATEGORIA':
                var { idCategoria, nombreCategoria } = action.idCategoriaAModificar;
                const categoriaAModificar = nuevoState.categoria.find(categoria => categoria.id === idCategoria)
                if (categoriaAModificar) {
                  categoriaAModificar.nombre = nombreCategoria;
                };
                return nuevoState;

        default:
            return state;
    }
}


export default createStore(reducer);

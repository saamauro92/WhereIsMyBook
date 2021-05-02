'use strict'
const EXPRESS = require('express'),
  APP = EXPRESS(),
  PORT = process.env.PORT || 3000,
  QY = require('./db'),
  CORS = require('cors');

APP.use(EXPRESS.json());
APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(CORS());

/*
Se requiere conocer
De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser unico. Todos los datos son requeridos.
De los generos de los libros, solo los nombres, el campo nunca puede ser vacio o nulo y no pueden repetirse las categorias.
De los libros, el nombre, una descripcion, su categoria y la persona a la cual se le ha prestado el libro. Para representar que un libro se encuentra en la biblioteca se puede utilizar cualquiera de las siguientes estrategias: null para libros en la biblioteca en el campo de persona_id, que el usuario se encuentre ingresado como una persona mas.
Se solicita verificar que el usuario no envie los campos requeridos solo con espacios en blanco.
Para asegurar los aciertos de las busquedas, se sugiere el guardado en mayusculas de todos los campos alfanumericos y recordar hacer las verificaciones teniendo en cuenta esto.

Se evaluara la correcta implementacion, el uso de try/catch, async-await, cors, express, validacion de los datos solicitados, manejo de errores.
El tp se realizara en grupos de 5 o 6 personas que seran elegidas al azar por el campus
La entrega se realizara en formato ZIP y de deberan incluir: package.json, package-lock.json, app.json NO INCLUIR node_modules (va a desconar puntaje el envio de esta carpeta).
Solo 1 entrega por equipo. Se debe incluir un archivo txt con el numero de grupo y el nombre y apellido de los integrantes.
*/

//PERSONA

APP.route('/persona')
  //OK //GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []
  .get(async (req, res) => {
    try {
      let query = 'SELECT * FROM persona;',
        data = await QY(query);
      res.status(200).send(data);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"
  .post(async (req, res) => {
    try {
      if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.alias) {
        throw new Error("faltan datos");
      };
      let query = 'SELECT id FROM persona WHERE email = ?;',
        data = await QY(query, [req.body.email]);
      if (data.length > 0) {
        throw new Error("el email ya se encuentra registrado");
      };
      if (req.body.nombre != " " && req.body.apellido != " " && req.body.email != " " && req.body.alias != " ") {
        query = 'INSERT INTO persona (nombre, apellido, email, alias) VALUE (?,?,?,?);';
        data = await QY(query, [req.body.nombre, req.body.apellido, req.body.email, req.body.alias]);
        query = 'SELECT * FROM persona WHERE id = ?;';
        data = await QY(query, [data.insertId]);
        res.status(200).send(data[0]);
      } else {
        throw new Error("los campos no pueden contener solo espacios en blanco");
      };
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

APP.route('/persona/:id')
  //OK //GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: <descripcion del error>} error.message, "no se encuentra esa persona"
  .get(async (req, res) => {
    try {
      let query = 'SELECT id FROM persona WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no se encuentra esa persona");
      };
      query = 'SELECT * FROM persona WHERE id = ?;';
      data = await QY(query, [req.params.id]);
      res.status(200).send(data[0]);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"
  .put(async (req, res) => {
    try {
      if (!req.body.nombre || !req.body.apellido || !req.body.alias) {
        throw new Error("faltan datos");
      };
/*       if (req.body.email) {
        throw new Error("el email no se puede modificar");
      }; */ // statement para bloquearlo desde el front end
      let query = 'SELECT * FROM persona WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no se encuentra esa persona");
      };
      if (req.body.nombre != " " && req.body.apellido != " " && req.body.alias != " ") {
        query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ? WHERE id = ?;';
        data = await QY(query, [req.body.nombre, req.body.apellido, req.body.alias, req.params.id]);
        query = 'SELECT * FROM persona WHERE id = ?;',
          data = await QY(query, [req.params.id]);
        res.status(200).send(data[0]);
      } else {
        throw new Error("los campos no pueden contener solo espacios en blanco");
      };
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //DELETE '/persona/:id' retorna: 200 y {mensaje: "se borro correctamente"} o bien 413, {mensaje: <descripcion del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"
  .delete(async (req, res) => {
    try {
      let query = 'SELECT id FROM persona WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no existe esa persona");
      };
      query = 'SELECT * FROM libro WHERE persona_id = ?;';
      data = await QY(query, [req.params.id]);
      if (data.length > 0) {
        throw new Error("esa persona tiene libros asociados, no se puede eliminar");
      };
      query = 'DELETE FROM persona WHERE id = ?;';
      data = await QY(query, [req.params.id]);
      res.status(200).send({ "mensaje": "se borro correctamente" });
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

  //CATEGORIA INNER JOIN

  APP.route('/categoria/libros-asociados')
  .get(async (req, res) => {
    //OK //GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
    try {
      let query = 'SELECT libro.nombre,  libro.categoria_id  FROM libro INNER JOIN categoria ON libro.categoria_id=categoria.id where libro.id;',
        data = await QY(query);
      res.status(200).send(data);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
/*
CATEGORIA

No se debe implementar el PUT
*/

APP.route('/categoria')
  .get(async (req, res) => {
    //OK //GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []
    try {
      let query = 'SELECT * FROM categoria;',
        data = await QY(query);
      res.status(200).send(data);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"
  .post(async (req, res) => {
    try {
      if (!req.body.nombre) {
        throw new Error("faltan datos");
      };
      let query = 'SELECT id FROM categoria WHERE nombre = ?;',
        data = await QY(query, [req.body.nombre]);
      if (data.length > 0) {
        throw new Error("ese nombre de categoria ya existe");
      };
      if (req.body.nombre != " ") {
        query = 'INSERT INTO categoria (nombre) VALUE (?);';
        data = await QY(query, [req.body.nombre]);
        query = 'SELECT * FROM categoria WHERE id = ?;';
        data = await QY(query, [data.insertId]);
        res.status(200).send(data[0]);
      } else {
        throw new Error("el campo no puede contener solo espacios en blanco");
      };
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

APP.route('/categoria/:id')
  //OK //GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"
  .get(async (req, res) => {
    try {
      let query = 'SELECT id FROM categoria WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("categoria no encontrada");
      };
      query = 'SELECT * FROM categoria WHERE id = ?;';
      data = await QY(query, [req.params.id]);
      res.status(200).send(data[0]);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413, {mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados, no se puede eliminar", "no existe la categoria indicada"
  .delete(async (req, res) => {
    try {
      let query = 'SELECT id FROM categoria WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no existe la categoria indicada");
      };
      query = 'SELECT * FROM libro WHERE categoria_id = ?;';
      data = await QY(query, [req.params.id]);
      if (data.length > 0) {
        throw new Error("categoria con libros asociados, no se puede eliminar");
      };
      query = 'DELETE FROM categoria WHERE id = ?;';
      data = await QY(query, [req.params.id]);
      res.status(200).send({ "mensaje": "se borro correctamente" });
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

//LIBRO

APP.route('/libro/prestado')
  // GET INNER JOIN 
  .get(async (req, res) => {
    try {
      let query = 'SELECT libro.nombre, libro.descripcion, libro.categoria_id, libro.persona_id, alias FROM libro INNER JOIN persona ON libro.persona_id=persona.id where libro.id;',
        data = await QY(query);
      res.status(200).send(data);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })

//LIBRO
APP.route('/libro')
  //OK //GET '/libro' devuelve 200 y [{id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}] o bien 413, {mensaje: <descripcion del error>} "error inesperado"
  .get(async (req, res) => {
    try {
      let query = 'SELECT * FROM libro;',
        data = await QY(query);
      res.status(200).send(data);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })


  //OK //POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"
  .post(async (req, res) => {
    try {
      if (!req.body.nombre || !req.body.categoria_id) {
        throw new Error("nombre y categoria son datos obligatorios");
      };
      let query = 'SELECT * FROM libro WHERE nombre = ? AND categoria_id = ?;',
        data = await QY(query, [req.body.nombre, req.body.categoria_id]);
      if (data.length > 0) {
        throw new Error("ese libro ya existe");
      };
      query = 'SELECT id FROM categoria WHERE id = ?;';
      data = await QY(query, [req.body.categoria_id]);
      if (data.length === 0) {
        throw new Error("no existe la categoria indicada");
      };
      if (req.body.persona_id) {
        query = 'SELECT id FROM persona WHERE id = ?;';
        data = await QY(query, [req.body.persona_id]);
        if (data.length === 0) {
          throw new Error("no existe la persona indicada");
        };
        if (data.length > 0) {
          if (req.body.nombre != " " && req.body.descripcion != " " && req.body.categoria_id != " " && req.body.persona_id != " ") {
            query = 'INSERT INTO libro (nombre, descripcion, categoria_id, persona_id) VALUE (?,?,?,?);';
            data = await QY(query, [req.body.nombre, req.body.descripcion, req.body.categoria_id, req.body.persona_id]);
          } else {
            throw new Error("los campos no pueden contener solo espacios en blanco");
          };
        };
      };
      if (!req.body.persona_id) {
        if (req.body.nombre != " " && req.body.descripcion != " " && req.body.categoria_id != " ") {
          query = 'INSERT INTO libro (nombre, descripcion, categoria_id) VALUE (?,?,?);';
          data = await QY(query, [req.body.nombre, req.body.descripcion, req.body.categoria_id]);
        } else {
          throw new Error("los campos no pueden contener solo espacios en blanco");
        };
      };
      query = 'SELECT * FROM libro WHERE id = ?;';
      data = await QY(query, [data.insertId]);
      res.status(200).send(data[0]);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

APP.route('/libro/:id')
  //OK //GET '/libro/:id' devuelve 200 {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} y status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro"
  .get(async (req, res) => {
    try {
      let query = 'SELECT * FROM libro WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no se encuentra ese libro");
      };
      res.status(200).send(data[0]);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //PUT '/libro/:id' y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado",  "solo se puede modificar la descripcion del libro
  .put(async (req, res) => {
    try {
      let query = 'SELECT id FROM libro WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no se encuentra ese libro");
      };
/*       if (req.body.nombre || req.body.categoria_id || req.body.persona_id) {
        throw new Error("solo se puede modificar la descripcion del libro");
      }; */ //modificado desde front end
      if (!req.body.descripcion) {
        throw new Error("faltan datos");
      };
      if (req.body.descripcion === " ") {
        throw new Error("el campo no puede contener solo espacios en blanco");
      };
      query = 'UPDATE libro SET descripcion = ? WHERE id = ?;';
      data = await QY(query, [req.body.descripcion, req.params.id]);
      query = 'SELECT * FROM libro WHERE id = ?;';
      data = await QY(query, [req.params.id]);
      res.status(200).send(data[0]);
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  })
  //OK //DELETE '/libro/:id' devuelve 200 y {mensaje: "se borro correctamente"}  o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro", "ese libro esta prestado no se puede borrar"
  .delete(async (req, res) => {
    try {
      let query = 'SELECT id FROM libro WHERE id = ?;',
        data = await QY(query, [req.params.id]);
      if (data.length === 0) {
        throw new Error("no se encuentra ese libro");
      };
      query = 'SELECT id FROM libro WHERE id = ? AND persona_id > 0;';
      data = await QY(query, [req.params.id]);
      if (data.length > 0) {
        throw new Error("ese libro esta prestado no se puede borrar");
      };
      query = 'DELETE FROM libro WHERE id = ?';
      data = await QY(query, [req.params.id]);
      res.status(200).send({ "mensaje": "se borro correctamente" });
    } catch (error) {
      res.status(413).send({ "mensaje": error.message });
    };
  });

//OK //PUT '/libro/prestar/:id' y {id:numero, persona_id:numero} devuelve 200 y {mensaje: "se presto correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva", "no se encontro el libro", "no se encontro la persona a la que se quiere prestar el libro"
APP.put('/libro/prestar/:id', async (req, res) => {
  try {
    let query = 'SELECT id FROM libro WHERE id = ? AND persona_id > 0;',
      data = await QY(query, [req.params.id]);
    if (data.length > 0) {
      throw new Error("el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva");
    };
    query = 'SELECT id FROM libro WHERE id = ?;',
      data = await QY(query, [req.params.id]);
    if (data.length === 0) {
      throw new Error("no se encontro el libro");
    };
    if (!req.body.persona_id) {
      throw new Error("faltan datos");
    };
    query = 'SELECT * FROM persona WHERE id = ?;';
    data = await QY(query, [req.body.persona_id]);
    if (data.length === 0) {
      throw new Error("no se encontro la persona a la que se quiere prestar el libro");
    };
    query = 'UPDATE libro SET persona_id = ? WHERE id = ?;';
    data = await QY(query, [req.body.persona_id, req.params.id]);
    res.status(200).send({ "mensaje": "se presto correctamente" });
  } catch (error) {
    res.status(413).send({ "mensaje": error.message });
  };
});

//OK //PUT '/libro/devolver/:id' y {} devuelve 200 y {mensaje: "se realizo la devolucion correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "ese libro no estaba prestado!", "ese libro no existe"
APP.put('/libro/devolver/:id', async (req, res) => {
  try {
    let query = 'SELECT id FROM libro WHERE id = ?;',
      data = await QY(query, [req.params.id]);
    if (data.length === 0) {
      throw new Error("ese libro no existe");
    };
    query = 'SELECT id FROM libro WHERE id = ? AND (persona_id = 0 OR persona_id IS NULL);';
    data = await QY(query, [req.params.id, req.body.persona_id]);
    if (data.length > 0) {
      throw new Error("ese libro no estaba prestado!");
    };
    if (req.body.persona_id) {
      throw new Error("el valor para devolver el libro debe ser 0 o nulo");
    };
    query = 'UPDATE libro SET persona_id = ? WHERE id = ?;';
    data = await QY(query, [req.body.persona_id, req.params.id]);
    res.status(200).send({ "mensaje": "se realizo la devolucion correctamente" });
  } catch (error) {
    res.status(413).send({ "mensaje": error.message });
  };
});

APP.all('*', (req, res) => {
  res.status(501).send({ "mensaje": "esa ruta no está implementada" });
});

APP.listen(PORT, (error) => {
  if (error) {
    throw error;
  };
  console.log("Server listening on port", PORT);
});

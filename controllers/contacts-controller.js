// importar mongodb y fichero con bbdd:
var db = require("../database/db");
var mongodb = require("mongodb");

// para validar datos
const { validationResult } = require("express-validator");

// conectar a bbdd
db.connect("mongodb://localhost:27017", function (error) {
  if (error) {
    console.log(error);
    throw "Error connecting to database";
  }
});

// devolver lista de todos los contactos guardados en bbdd
module.exports.get_all_contacts = function (request, response) {
  db.get()
    .db("contact_list")
    .collection("contacts")
    .find()
    .toArray(function (error, result) {
      if (error) {
        console.log(error);
        throw "Error connecting to database";
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
        console.log(response.locals.settings);
      }
    });
};

// devolver un contacto buscando por su id
module.exports.get_one_contact = function (request, response) {
  const filter = { _id: new mongodb.ObjectID(request.params.id) };
  db.get()
    .db("contact_list")
    .collection("contacts")
    .find(filter)
    .toArray(function (error, result) {
      if (error) {
        console.log(error);
        throw "Error connecting to database";
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
      }
    });
};

// crear nuevo contacto
module.exports.create_one_contact = function (request, response, next) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  if (db.get() === null) {
    next(new Error("Connection was unsuccessful"));
    return;
  }

  const contactInfo = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    age: request.body.age,
    dni: request.body.dni,
    birthday: request.body.birthday,
    favColor: request.body.favColor,
    gender: request.body.gender,
  };
  db.get()
    .db("contact_list")
    .collection("contacts")
    .insertOne(contactInfo, function (error, result) {
      if (error) {
        throw "Create new contact failed";
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
      }
    });
};

// modificar contacto
module.exports.update_one_contact = function (request, response, next) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() });
  }
  if (db.get() === null) {
    next(new Error("Connection was unsuccessful"));
    return;
  }
  const filter = { _id: new mongodb.ObjectID(request.params.id) };
  const updatedContact = {
    $set: {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      age: request.body.age,
      dni: request.body.dni,
      birthday: request.body.birthday,
      favColor: request.body.favColor,
      gender: request.body.gender,
    },
  };

  db.get()
    .db("contact_list")
    .collection("contacts")
    .updateOne(filter, updatedContact, function (error, result) {
      if (error) {
        next(new Error(`Update contact with id: ${request.params.id} failed`));
        return;
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
      }
    });
};

// borrar contacto
module.exports.delete_one_contact = function (request, response, next) {
  if (db.get() === null) {
    next(new Error("Connection was unsuccessful"));
    return;
  }
  const filter = { _id: new mongodb.ObjectID(request.params.id) };
  db.get()
    .db("contact_list")
    .collection("contacts")
    .deleteOne(filter, function (error, result) {
      if (error) {
        next(new Error(`Delete contact with id: ${request.params.id} failed`));
        return;
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
      }
    });
};
// borrar TODOS los contactos
module.exports.delete_all_contacts = function (request, response, next) {
  if (db.get() === null) {
    next(new Error("Connection was unsuccessful"));
    return;
  }
  //const filter = { _id: new mongodb.ObjectID(request.params.id) };
  db.get()
    .db("contact_list")
    .collection("contacts")
    .deleteMany({}, function (error, result) {
      if (error) {
        next(new Error("Delete all contacts failed"));
        return;
      } else {
        //enviar resultado si hubo éxito
        response.send(result);
      }
    });
};

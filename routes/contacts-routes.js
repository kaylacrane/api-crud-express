var express = require("express");
var router = express.Router();
var contacts_controller = require("../controllers/contacts-controller");
const { check } = require("express-validator");

// validar datos enviados
const valid_contact = [
  check(
    "firstName",
    "First name must be at least 3 characters and cannot include numbers"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "en-GB"), { ignore: "- /" }),
  check(
    "lastName",
    "Last name(s) must be at least 3 characters and cannot include numbers"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "en-GB"), { ignore: "- /" }),
  check("age", "Age must be a number between 0 and 125").isFloat({
    min: 0,
    max: 125,
  }),
  check("dni", "DNI must be a combination of exactly 9 numbers and letters")
    .isLength({ min: 9, max: 9 })
    .isAlphanumeric()
    .matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i),
  check(
    "birthday",
    "Birthday must be in correct format: YYYY-MM-DD"
  ).isISO8601(),
  check(
    "favColor",
    "Favorite color must be at least 3 characters and cannot include numbers"
  )
    .isLength({ min: 3 })
    .isAlpha((locale = "en-GB"), { ignore: "- /" }),
  check(
    "gender",
    "Gender must be one of the following: male, female, other, no answer"
  ).isIn(["male", "female", "other", "no answer"]),
];

// para devolver lista de contactos
router.get("/", contacts_controller.get_all_contacts);

// para devolver un contacto proporcionando su id
router.get("/:id", contacts_controller.get_one_contact);

// crear contacto
router.post("/", valid_contact, contacts_controller.create_one_contact);

// modificar un contacto ya guardado en la bbdd
router.put("/:id", valid_contact, contacts_controller.update_one_contact);

// borrar TODOS los contactos
router.delete("/delete", contacts_controller.delete_all_contacts);

// borrar contacto
router.delete("/:id", contacts_controller.delete_one_contact);

module.exports = router;

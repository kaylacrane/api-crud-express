var express = require("express");
var router = express.Router();

// GET para cuando se accede la página principal
router.get("/", function (request, response, next) {
  response.render("index");
});

module.exports = router;

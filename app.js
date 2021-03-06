//dependencias
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

//log de peticiones
app.use(logger("dev"));
//para traducir todas peticiones de tipo json
app.use(express.json());
//para decodificar parámetros en las peticiones
app.use(express.urlencoded({ extended: false }));
//para tratar cookies
app.use(cookieParser());
//para que express sepa donde buscar contenido estático
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./routes/index");
var contactsRouter = require("./routes/contacts-routes");

//definir rutas de la app
app.use("/", indexRouter);
app.use("/contacts", contactsRouter);

// handler de errores
app.use(function (request, response, next) {
  next(createError(404));
  response.send("Oh no, a 404!");
});

// handler de errores
app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  response.status(error.status || 500);
  response.render("error");
});

//exportar app
module.exports = app;

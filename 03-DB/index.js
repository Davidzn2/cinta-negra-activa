//IMPORTACIONES DE TERCEROS
const express = require("express");
const mongoose = require("mongoose");

const { config } = require("./config");

const app = express();

// CONEXIÓNN A LA BASE DE DATOS
mongoose
  .connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado!!!"))
  .catch((err) => console.log("Hubo un error de conexión error: ", err));

// GENERAR ESQUEMA => DEFINE LAS REGLAS DENTRO DE UNA COLECCION
const equiposSchema = new mongoose.Schema({
  nombre: String,
  liga: String,
  titulos: Number,
  clasifico: Boolean,
  products: [{
    type: mongoose.Schema.Types.ObjectId,

  }],
});
// MODELO, -> OBJETO QUE ME DEJA INTERACTUAR CON LA COLECCION DE MONGO DB
const Equipos = mongoose.model("Equipos", equiposSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get("/", (request, response) => {
  response.send("It works");
});
app.get("/equipos", (request, response) => {
  Equipos.find()
    .then((respDB) => response.status(200).json(respDB))
    .catch((err) => response.status(400).json(err));
});

app.get("/equipos/:id", (request, response) => {
  Equipos.findById(request.params.id)
    .then((respDB) => response.status(200).json(respDB))
    .catch((err) => response.status(400).json(err));
});
app.post("/equipos", (request, response) => {
  // 1. Recibir la info que me manda el cliente
  const { body } = request;

  // 2. Pedirle a la DB que cree un documento en la colleccion
  // Con la info del body
  const newEquipo = new Equipos(body);
  newEquipo.save()
    .then((respDB) => response.status(201).json(respDB))
    .catch((err) => response.status(400).json(err));
});
app.patch("/equipos/:id", (request, response)=>{
  Equipos.findByIdAndUpdate(request.params.id, request.body)
  .then((respDB) => response.status(200).json(respDB))
  .catch((err) => response.status(400).json(err));
})
app.delete("/equipos/:id", (request, response) => {
  Equipos.findByIdAndDelete(request.params.id)
    .then((respDB) => response.status(204).json(respDB))
    .catch((err) => response.status(400).json(err));
});
app.listen(config.port, () =>
  console.log(`Api Listening on port: ${config.port}`)
);

//IMPORTACIONES DE TERCEROS
const express = require("express");
const mongoose = require("mongoose");
const { config } = require("./config");
const app = express();
mongoose
  .connect(config.db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado!!!"))
  .catch((err) => console.log("Hubo un error de conexión error: ", err));

const authorSchema = new mongoose.Schema({
  nombre: String,
  biografia: String,
  fecha_de_nacimiento: Date,
  nacionalidad: String,
});
const bookSchema = new mongoose.Schema({
  titulo: String,
  paginas: Number,
  isbn: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
});
// Models
const Authors = mongoose.model("Authors", authorSchema);
const Books = mongoose.model("Books", bookSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.post("/author", (req, res) => {
  const { body } = req;
  const newAuthor = new Authors(req.body)
  newAuthor.save()
    .then((respDB) => res.status(201).json(respDB))
    .catch((err) => res.status(400).json(err));
});

app.post("/book", (req, res) => {
  const { body } = req;
  const newBook = new Books(body);
  newBook
    .save()
    .then((respDB) => res.status(201).json(respDB))
    .catch((err) => res.status(400).json(err));
});
app.get('/book/:id', (req, res)=>{
    const { id } = req.params;
    Books.findById(id, (err, book)=>{
        Authors.populate(book, {path: 'author'}, (err, book)=>{
            res.status(200).send(book)
        })
    })
})
app.listen(config.port, () =>
  console.log(`Api Listening on port: ${config.port}`)
);

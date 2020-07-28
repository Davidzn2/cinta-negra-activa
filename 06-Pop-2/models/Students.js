const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  apellido: String,
  edad: Number,
  empleo: String,
  career: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'career',
  }],
});

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;
